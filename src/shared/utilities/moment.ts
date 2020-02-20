import moment from "moment"
import "moment/locale/ja"
moment.locale("ja")
export function changeLocale(locale: string) {
    moment.locale(locale)
}
export function toLocalStringTime(date: Date): string {
    return moment(date).format("LL")
}
export default moment
