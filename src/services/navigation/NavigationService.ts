import React, { RefObject } from 'react'
import { StackActions } from '@react-navigation/native'

export const navigationRef: RefObject<any> = React.createRef()
// export function push(name: string, params?: any) {
//     console.log(`${'push to ' + name}`, params)
//     navigationRef.current.push(name, params)
// }
export function navigate(name: string, params?: any) {
    console.log(`${'navigate to ' + name}`, params)
    navigationRef.current.navigate(name, params)
}
export function goBack() {
    navigationRef.current.goBack()
}
export function navigateReplace(name: string, params?: any) {
    console.log(`${'navigate replace  ' + name}`, params)
    navigationRef.current.dispatch(StackActions.replace(name, params))
}
