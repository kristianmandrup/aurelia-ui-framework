var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-input-group", "../utils/ui-utils", "../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_input_group_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UILanguage = (function (_super) {
        __extends(UILanguage, _super);
        function UILanguage(element) {
            _super.call(this, element);
            this.language = '';
            this.languages = [];
            this.disabled = false;
        }
        UILanguage.prototype.attached = function () {
            _super.prototype.attached.call(this);
            this.languagesChanged(this.languages);
            this.languageChanged(this.language);
        };
        UILanguage.prototype.languageChanged = function (newValue) {
            if (newValue === null)
                return this.__value = '';
            var l = ui_utils_1._.find(this.__languages, ['id', newValue]) || null;
            this.__value = l === null ? '' : l.name;
        };
        UILanguage.prototype.languagesChanged = function (newValue) {
            var s = [], a = [];
            var isMap = newValue instanceof Map;
            ui_utils_1._.forEach(UILanguage.LANGUAGES, function (l) {
                if (!isMap && newValue.indexOf(l.id) == -1)
                    a.push(l);
                if (!isMap && newValue.indexOf(l.id) > -1)
                    s.push(l);
                if (isMap && newValue.has(l.id))
                    s.push(l);
                if (isMap && !newValue.has(l.id))
                    a.push(l);
            });
            this.__languages = s;
            this.__available = a;
        };
        UILanguage.prototype.formatter = function () {
            return this.value;
        };
        UILanguage.prototype.__add = function (lang) {
            this.__languages.push(ui_utils_1._.remove(this.__available, ['id', lang.id])[0]);
            ui_event_1.UIEvent.fireEvent('add', this.element, lang.id);
            this.__select(lang);
            this.__focus = false;
        };
        UILanguage.prototype.__select = function (lang) {
            this.language = lang.id;
            ui_event_1.UIEvent.fireEvent('select', this.element, lang.id);
            this.__focus = false;
        };
        UILanguage.prototype.__remove = function (lang) {
            this.__available.push(ui_utils_1._.remove(this.__languages, ['id', lang.id])[0]);
            if (this.__languages == null)
                this.__languages = [];
            ui_event_1.UIEvent.fireEvent('delete', this.element, lang.id);
            this.__select(this.__languages[0] || { id: '' });
            this.__focus = false;
        };
        UILanguage.LANGUAGES = [
            { id: 'ar', name: 'العربية (Arabic)', rtl: true },
            { id: 'de', name: 'Deutsche (German)' },
            { id: 'el', name: 'ελληνικά (Greek)' },
            { id: 'en', name: 'English' },
            { id: 'es', name: 'Español (Spanish)' },
            { id: 'fr', name: 'Français (French)' },
            { id: 'hi', name: 'हिंदी (Hindi)' },
            { id: 'id', name: 'Bahasa (Indonesia)' },
            { id: 'it', name: 'Italiano (Italian)' },
            { id: 'ja', name: '日本 (Japanese)' },
            { id: 'ko', name: '한국어 (Korean)' },
            { id: 'ms', name: 'Malay (Malaysian)' },
            { id: 'nl', name: 'Nederlands (Dutch)' },
            { id: 'pt', name: 'Português (Portuguese)' },
            { id: 'pt-br', name: 'Português (Brasil)' },
            { id: 'ru', name: 'Русский (Russian)' },
            { id: 'th', name: 'ภาษาไทย (Thai)' },
            { id: 'tl', name: 'Tagalog (Philipines)' },
            { id: 'tw', name: '繁體中文 (Traditional Chinese)' },
            { id: 'vi', name: 'Tiếng Việt (Vietnamese)' },
            { id: 'zh', name: '简体中文 (Simplified Chinese)' }
        ];
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], UILanguage.prototype, "language", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UILanguage.prototype, "languages", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Boolean)
        ], UILanguage.prototype, "disabled", void 0);
        UILanguage = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement('ui-language'), 
            __metadata('design:paramtypes', [Element])
        ], UILanguage);
        return UILanguage;
    }(ui_input_group_1.UIInputGroup));
    exports.UILanguage = UILanguage;
});
