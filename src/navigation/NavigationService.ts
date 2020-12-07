import React, { RefObject } from 'react';
import { CommonActions, StackActions } from '@react-navigation/native';
import { APP_ROUTE } from './config/routes';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params = {}): void {
    // console.log(`${'navigate to ' + name}`, params)
    navigationRef.current.navigate(name, params);
}

export function goBack(): void {
    navigationRef.current.goBack();
}

export function navigateReplace(name: string, params = {}): void {
    // console.log(`${`navigate replace  ${name}`}`, params);
    navigationRef.current.dispatch(StackActions.replace(name, params));
}

export function reset(name?: string) {
    navigationRef.current.dispatch({
        ...CommonActions.reset({
            index: 1,
            routes: [{ name: name || APP_ROUTE.MAIN_TAB }],
        }),
    });
}
