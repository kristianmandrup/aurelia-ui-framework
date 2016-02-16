/**
 *    UI Component: Checkbox/Radio
 *    @author    Adarsh Pastakia
 *    @company   HMC
 *    @copyright 2015-2016, Adarsh Pastakia
 **/
import {autoinject, customElement, containerless, bindable, bindingMode} from "aurelia-framework";
import {UIEvent} from "../utils/ui-event";
import {UIInput} from "./ui-input";

@bindable({
	name: 'checked',
	attribute: 'checked',
	defaultBindingMode: bindingMode.twoWay,
	defaultValue: false
})

@autoinject()
@customElement('ui-option')
export class UIOption {
	private _option;
	private _input;
	private _id;
	private _type:string      = '';
	private _classes:string   = '';
	private _checkbox:boolean = true;

	private checked:any        = false;
	@bindable id:string        = '';
	@bindable name:string      = '';
	@bindable value:string     = '';
	@bindable disabled:boolean = false;

	constructor(public element:Element) {
		this._id = `option-${UIInput._id++}`;
		if (element.hasAttribute('radio')) this._checkbox = false;
	}

	bind() {
		this._type    = this._checkbox ? 'checkbox' : 'radio';
		this._classes = this._checkbox ? 'ui-checkbox' : 'ui-radio';
	}

	attached() {
		$(this._option).data('UIOption', this);
		$(this._input).attr(this.disabled === true ? 'disabled' : 'D', '');
	}

	disabledChanged(newValue) {
		this.disabled = newValue === 'true' || newValue === true;
		this.makeBusy(newValue);
	}

	makeBusy(newValue) {
		$(this._input)
			.removeAttr('D')
			.removeAttr('disabled')
			.attr(newValue === true || this.disabled === true ? 'disabled' : 'D', '');
	}

	private _checkChanged($event:UIEvent) {
		$event.detail = this.checked;
	}
}
