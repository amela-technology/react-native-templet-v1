import i18next from 'i18next';
import { getLocales } from 'react-native-localize';
import en from 'assets/locates/en';
import jp from 'assets/locates/jp';
import { initReactI18next } from 'react-i18next';

const DEFAULT_LANG = 'jp';

export const getLanguage = (): string => {
    const lan = getLocales();
    try {
        const primaryLocate = lan[0];
        return primaryLocate.languageCode;
    } catch (error) {
        return DEFAULT_LANG;
    }
};

i18next.use(initReactI18next).init({
    interpolation: {
        // React already does escaping
        escapeValue: false,
    },
    lng: getLanguage(),
    fallbackLng: DEFAULT_LANG,
    // Using simple hardcoded resources for simple example
    resources: {
        en: {
            translation: en,
        },
        jp: {
            translation: jp,
        },
    },
});

export default i18next;
