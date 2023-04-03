/* eslint-disable consistent-return */
import i18next from 'i18next';
import { getLocales } from 'react-native-localize';
import en from 'assets/locates/en';
import jp from 'assets/locates/jp';
import { initReactI18next } from 'react-i18next';
import { store } from 'app-redux/store';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import 'dayjs/locale/en';
import { updateLanguageKey } from 'app-redux/slices/languageSlice';

export type Resource = typeof en & typeof jp;
const DEFAULT_LANG = 'jp';

export function getLanguage() {
    const lan = getLocales();
    const listLng = ['jp', 'en'];
    try {
        const primaryLocate = lan[0];
        let tempLng = primaryLocate?.languageCode?.toLowerCase();
        if (tempLng === 'ja') {
            tempLng = 'jp';
        }
        const lng = listLng.includes(tempLng) ? tempLng : DEFAULT_LANG;
        // If you want to use DEFAULT_LANG only, comment above line + uncomment below line
        // const lng = DEFAULT_LANG;
        store.dispatch(updateLanguageKey(lng));
        return lng;
    } catch (error) {
        return DEFAULT_LANG;
    }
}

i18next.use(initReactI18next).init({
    interpolation: {
        escapeValue: false,
    },
    lng: store?.getState()?.languageKey?.data || getLanguage(),
    fallbackLng: DEFAULT_LANG,
    resources: {
        en: {
            translation: en,
        },
        jp: {
            translation: jp,
        },
    },
});

export const loadLocaleLanguage = () => {
    const lng = store?.getState()?.languageKey?.data || DEFAULT_LANG;
    dayjs.locale(lng);
    i18next.addResourceBundle(lng, 'translation', lng === 'en' ? en : jp);
    i18next.changeLanguage(lng);
};

export default i18next;
