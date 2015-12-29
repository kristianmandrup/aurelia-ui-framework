define(["require", "exports", "./utils/ui-app-state", "./utils/ui-converters", "./utils/ui-event", "./utils/ui-http-service", "./utils/ui-dwr-service", "./components/ui-lang-select", "./utils/ui-model", "./utils/ui-tree-models", "./utils/ui-utils", "./utils/ui-validations", "./utils/ui-dialog-service", './libs/chosen', './libs/notify', './libs/marked', './libs/phonelib', './libs/countries', './libs/currencies', './libs/datepicker', './libs/textcomplete'], function (require, exports, ui_app_state_1, ui_converters_1, ui_event_1, ui_http_service_1, ui_dwr_service_1, ui_lang_select_1, ui_model_1, ui_tree_models_1, ui_utils_1, ui_validations_1, ui_dialog_service_1) {
    function configure(aurelia) {
        aurelia.globalResources('./core/ui-app');
        aurelia.globalResources('./core/ui-page');
        aurelia.globalResources('./core/ui-section');
        aurelia.globalResources('./core/ui-content');
        aurelia.globalResources('./core/ui-header');
        aurelia.globalResources('./core/ui-sidebar');
        aurelia.globalResources('./core/ui-toolbar');
        aurelia.globalResources('./core/ui-statsbar');
        aurelia.globalResources('./containers/ui-button-group');
        aurelia.globalResources('./containers/ui-option-group');
        aurelia.globalResources('./containers/ui-grid-row');
        aurelia.globalResources('./containers/ui-grid-column');
        aurelia.globalResources('./containers/ui-datagrid');
        aurelia.globalResources('./containers/ui-menu');
        aurelia.globalResources('./containers/ui-form');
        aurelia.globalResources('./containers/ui-panel');
        aurelia.globalResources('./containers/ui-scroll');
        aurelia.globalResources('./containers/ui-tab');
        aurelia.globalResources('./containers/ui-login');
        aurelia.globalResources('./containers/ui-dialog');
        aurelia.globalResources('./components/ui-button');
        aurelia.globalResources('./components/ui-switch');
        aurelia.globalResources('./components/ui-input');
        aurelia.globalResources('./components/ui-date');
        aurelia.globalResources('./components/ui-list');
        aurelia.globalResources('./components/ui-ribbon');
        aurelia.globalResources('./components/ui-option');
        aurelia.globalResources('./components/ui-chosen');
        aurelia.globalResources('./components/ui-tree');
        aurelia.globalResources('./components/ui-divider');
        aurelia.globalResources('./components/ui-markdown');
        aurelia.globalResources('./components/ui-lang-select');
        aurelia.globalResources('./utils/ui-converters');
    }
    exports.configure = configure;
    exports.UIApplicationState = ui_app_state_1.UIApplicationState;
    exports.AuthInterceptor = ui_app_state_1.AuthInterceptor;
    exports.DateValueConverter = ui_converters_1.DateValueConverter;
    exports.NumberValueConverter = ui_converters_1.NumberValueConverter;
    exports.CurrencyValueConverter = ui_converters_1.CurrencyValueConverter;
    exports.KeysValueConverter = ui_converters_1.KeysValueConverter;
    exports.MarkdownValueConverter = ui_converters_1.MarkdownValueConverter;
    exports.SortValueConverter = ui_converters_1.SortValueConverter;
    exports.UIEvent = ui_event_1.UIEvent;
    exports.UIHttpService = ui_http_service_1.UIHttpService;
    exports.UIDwrService = ui_dwr_service_1.UIDwrService;
    exports.UILangSelect = ui_lang_select_1.UILangSelect;
    exports.UIModel = ui_model_1.UIModel;
    exports.UITreeModel = ui_tree_models_1.UITreeModel;
    exports._ = ui_utils_1._;
    exports.moment = ui_utils_1.moment;
    exports.numeral = ui_utils_1.numeral;
    exports.Format = ui_utils_1.Format;
    exports.Utils = ui_utils_1.Utils;
    exports.watch = ui_utils_1.watch;
    exports.UIValidation = ui_validations_1.UIValidation;
    exports.UIDialogService = ui_dialog_service_1.UIDialogService;
});
