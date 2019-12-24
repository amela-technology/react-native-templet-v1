"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18next_1 = require("i18next");
var react_native_localize_1 = require("react-native-localize");
var en_1 = require("../../assets/locates/en");
var jp_1 = require("../../assets/locates/jp");
var DEFAULT_LANG = "en";
i18next_1.default.init({
    interpolation: {
        // React already does escaping
        escapeValue: false,
    },
    lng: getLanguage(),
    fallbackLng: DEFAULT_LANG,
    // Using simple hardcoded resources for simple example
    resources: {
        en: {
            translation: en_1.default,
        },
        jp: {
            translation: jp_1.default,
        },
    },
});
function getLanguage() {
    var lan = react_native_localize_1.getLocales();
    try {
        var primaryLocate = lan[0];
        return primaryLocate.languageCode;
    }
    catch (error) {
        return DEFAULT_LANG;
    }
}
exports.getLanguage = getLanguage;
exports.default = i18next_1.default;
