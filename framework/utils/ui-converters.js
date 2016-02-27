define(["require", "exports", "aurelia-ui-framework"], function (require, exports, aurelia_ui_framework_1) {
    var MarkdownValueConverter = (function () {
        function MarkdownValueConverter() {
        }
        MarkdownValueConverter.prototype.toView = function (value) {
            return aurelia_ui_framework_1.UIFormat.toHTML(value || '');
        };
        return MarkdownValueConverter;
    })();
    exports.MarkdownValueConverter = MarkdownValueConverter;
    var DateValueConverter = (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.toView = function (value, format) {
            return aurelia_ui_framework_1.UIFormat.date(value, format);
        };
        return DateValueConverter;
    })();
    exports.DateValueConverter = DateValueConverter;
    var FromNowValueConverter = (function () {
        function FromNowValueConverter() {
        }
        FromNowValueConverter.prototype.toView = function (value) {
            return aurelia_ui_framework_1.UIFormat.fromNow(value);
        };
        return FromNowValueConverter;
    })();
    exports.FromNowValueConverter = FromNowValueConverter;
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.toView = function (value, format) {
            return aurelia_ui_framework_1.UIFormat.number(value, format);
        };
        return NumberValueConverter;
    })();
    exports.NumberValueConverter = NumberValueConverter;
    var CurrencyValueConverter = (function () {
        function CurrencyValueConverter() {
        }
        CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
            return aurelia_ui_framework_1.UIFormat.currency(value, symbol, format);
        };
        return CurrencyValueConverter;
    })();
    exports.CurrencyValueConverter = CurrencyValueConverter;
    var PercentValueConverter = (function () {
        function PercentValueConverter() {
        }
        PercentValueConverter.prototype.toView = function (value) {
            return aurelia_ui_framework_1.UIFormat.percent(value);
        };
        return PercentValueConverter;
    })();
    exports.PercentValueConverter = PercentValueConverter;
    var KeysValueConverter = (function () {
        function KeysValueConverter() {
        }
        KeysValueConverter.prototype.toView = function (object) {
            return Object.keys(object);
        };
        return KeysValueConverter;
    })();
    exports.KeysValueConverter = KeysValueConverter;
    var GroupValueConverter = (function () {
        function GroupValueConverter() {
        }
        GroupValueConverter.prototype.toView = function (object, property) {
            return _.groupBy(object, property);
        };
        return GroupValueConverter;
    })();
    exports.GroupValueConverter = GroupValueConverter;
    var SortValueConverter = (function () {
        function SortValueConverter() {
        }
        SortValueConverter.prototype.toView = function (value, property) {
            return _.sortBy(value, property);
        };
        return SortValueConverter;
    })();
    exports.SortValueConverter = SortValueConverter;
    var JsonValueConverter = (function () {
        function JsonValueConverter() {
        }
        JsonValueConverter.prototype.toView = function (value) {
            return JSON.stringify(value, null, 4);
        };
        return JsonValueConverter;
    })();
    exports.JsonValueConverter = JsonValueConverter;
    var IsStringValueConverter = (function () {
        function IsStringValueConverter() {
        }
        IsStringValueConverter.prototype.toView = function (value) {
            return _.isString(value);
        };
        return IsStringValueConverter;
    })();
    exports.IsStringValueConverter = IsStringValueConverter;
    var IsArrayValueConverter = (function () {
        function IsArrayValueConverter() {
        }
        IsArrayValueConverter.prototype.toView = function (value) {
            return _.isArray(value);
        };
        return IsArrayValueConverter;
    })();
    exports.IsArrayValueConverter = IsArrayValueConverter;
    var IsObjectValueConverter = (function () {
        function IsObjectValueConverter() {
        }
        IsObjectValueConverter.prototype.toView = function (value) {
            return _.isObject(value);
        };
        return IsObjectValueConverter;
    })();
    exports.IsObjectValueConverter = IsObjectValueConverter;
});
