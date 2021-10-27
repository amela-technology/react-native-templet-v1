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
    return i18next.t('error.require', { field }) || '';
};
