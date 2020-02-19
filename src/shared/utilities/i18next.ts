import i18next from 'i18next'
import {getLocales} from 'react-native-localize'
import en from '../../assets/locates/en'
import jp from '../../assets/locates/jp'

const DEFAULT_LANG = 'en'
i18next.init({
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
})

export function getLanguage() {
    const lan = getLocales()
    try {
        const primaryLocate = lan[0]
        return primaryLocate.languageCode
    } catch (error) {
        return DEFAULT_LANG
    }
}

export default i18next
