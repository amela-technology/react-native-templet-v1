import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import i18next from 'i18next';

dayjs.locale('ja');
export const changeLocale = (locale: string): void => {
    dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const requireField = (field: string) => {
    return i18next.t('validateMessage.require', { field }) || '';
};

export const getFirstName = (titleName: string) => {
    let details = [];
    details = titleName.split(' ');
    return details[0].charAt(0) + details[details.length - 1].charAt(0);
};
