import {autoinject} from "aurelia-framework";
import {CompositionEngine} from "aurelia-templating";
import {Container} from "aurelia-dependency-injection";
import {ViewSlot, CompositionContext} from "aurelia-templating";
import {Origin} from "aurelia-metadata";
import {_} from "./ui-utils";

@autoinject()
export class UIDialogService {

	public dialogContainer;
	private _taskbar;

	private _active:any;
	private _windows:Array<any> = [];

	constructor(private container:Container,
				private compositionEngine:CompositionEngine) {
		if (!this.dialogContainer) {
			$('body').append('<div class="ui-dialog-container"></div>');
			this.dialogContainer = $('body .ui-dialog-container').get(0);

			$(this.dialogContainer)
				.on('close', (e)=>this.closeDialog(e.originalEvent))
				.on('collapse', (e)=>this.collapse(e.originalEvent))
				.on('mousedown', (e)=>this.moveStart(e.originalEvent))
				.on('mousemove', (e)=>this.move(e.originalEvent))
				.on('mouseup', (e)=>this.moveEnd(e.originalEvent));
		}
		if (!this._taskbar) {
			this._taskbar = $('body .ui-app-taskbar');
			this._taskbar.click((e)=>this.switchActive((<any>e.originalEvent.target).window));
		}
	}

	_invokeLifecycle(instance, name, model) {
		if (typeof instance[name] === 'function') {
			let result = instance[name](model);

			if (result instanceof Promise) {
				return result;
			}

			if (result !== null && result !== undefined) {
				return Promise.resolve(result);
			}

			return Promise.resolve(true);
		}

		return Promise.resolve(true);
	}

	_getViewModel(instruction) {
		if (typeof instruction.viewModel === 'function') {
			instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
		}

		if (typeof instruction.viewModel === 'string') {
			return this.compositionEngine.ensureViewModel(instruction);
		}

		return Promise.resolve(instruction);
	}

	show(vm:any, model?:any):Promise<any> {
		let childContainer = this.container.createChild();


		let instruction = {
			viewModel: vm,
			container: this.container,
			childContainer: childContainer,
			model: model ? model : {}
		};

		return this._getViewModel(instruction)
			.then(returnedInstruction => {
				let viewModel:any = <any>returnedInstruction.viewModel;

				return this._invokeLifecycle(viewModel, 'canActivate', model).then(canActivate => {
					if (canActivate) {
						return this.compositionEngine.createController(returnedInstruction).then(controller => {
							controller.automate();

							let slot = new ViewSlot(this.dialogContainer, true);
							slot.add(controller.view);

							if (this._active) {
								this._active.active = false;
							}
							this._active             = $(controller.view).children().get(0).UIElement;
							this._active._taskButton = document.createElement('button');
							this._active._taskButton.classList.add('ui-win-button');
							this._active._taskButton.classList.add('ui-active');
							this._active._taskButton.innerHTML = this._active.dataTitle;
							this._active._taskButton.window    = this._active;

							//$(this._active._dialog).offset({left: this._active._x, top: this._active._y});
							this._windows.push(this._active);

							setTimeout(() => {
								slot.attached();
								this._taskbar.append(this._active._taskButton);
							}, 200);
						});
					}
				});
			});
	}

	closeDialog(e) {
		//this._invokeLifecycle(viewModel, 'canActivate', model).then(canDeactivate => {
		//	if (canDeactivate) {
		let dialog = $(e.target).closest('ui-dialog').get(0).UIElement;
		//delete this._windows[dialog.id];
		_.remove(this._windows, 'id', dialog.id);
		dialog.remove();

		if (this._windows.length > 0) {
			(this._active = _.last(this._windows)).active = true;
		}

		//	}
		//});
	}

	switchActive(d) {
		if (this._active) {
			if (d.id === this._active.id) return;
			this._active.active = false;
		}
		if (d) {
			(this._active = d).minimized = false;
			(this._active = d).active = true;
		}
	}

	collapse(e) {
		$(e.target).closest('ui-dialog').get(0).UIElement.minimized = true;
		if (this._windows.length > 0) {
			this._active = _.findLast(this._windows, 'minimized', false);
			if (this._active) this._active.active = true;
		}
	}


	/**
	 * dialog move
	 */
	private _isDragging = false;
	private _isResizing = false;
	private _startX     = 0;
	private _startY     = 0;
	private _dialog;

	private moveStart($event) {
		this._dialog = $($event.target).closest('ui-dialog').get(0).UIElement;
		if ($($event.target).closest('.ui-header').length == 0 && !$($event.target).hasClass('ui-resizer')) {
			this.switchActive(this._dialog);
			return;
		}
		if ($($event.target).closest('button').length !== 0) return;

		this._startX     = $event.x;
		this._startY     = $event.y;
		this._isDragging = true;
		this._isResizing = $($event.target).hasClass('ui-resizer');

		$(this._dialog._dialog).addClass('ui-dragging');
		$(this.dialogContainer).addClass('ui-dragging');
	}

	private moveEnd($event) {
		if (!this._isDragging) return;
		$(this.dialogContainer).removeClass('ui-dragging');
		$(this._dialog._dialog).removeClass('ui-dragging');
		this._isDragging = false;
		this._dialog     = null;
	}

	private move($event) {
		if (!this._isDragging) return;

		let x = $event.x - this._startX;
		let y = $event.y - this._startY;

		if (!this._isResizing) {
			let p  = $(this._dialog._dialog).offset();
			let w  = $(this._dialog._dialog).outerWidth();
			let h  = $(this._dialog._dialog).outerHeight();
			let pw = $(this.dialogContainer).outerWidth();
			let ph = $(this.dialogContainer).outerHeight();

			if (p.left + x < 0) {
				x      = 0;
				p.left = 0;
			}
			if (p.top + y < 0) {
				y     = 0;
				p.top = 0;
			}
			if (p.left + x + w > pw) {
				x      = 0;
				p.left = pw - w;
			}
			if (p.top + y + h + 36 > ph) {
				y     = 0;
				p.top = ph - h - 36;
			}
			this._dialog._current.top  = p.top + y;
			this._dialog._current.left = p.left + x;
		}
		else {
			this._dialog._current.width += x;
			this._dialog._current.height += y;
		}

		this._startX = x !== 0 ? $event.x : this._startX;
		this._startY = y !== 0 ? $event.y : this._startY;
	}
}