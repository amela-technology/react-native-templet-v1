import moment, { Moment } from 'moment';
import 'moment/locale/ja';

moment.locale('ja');
export const changeLocale = (locale: string): void => {
    moment.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
    return moment(date).format('LL');
};
export default moment;
