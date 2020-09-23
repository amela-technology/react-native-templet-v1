/* eslint-disable no-console */
import React, { RefObject } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params = {}): void {
    // console.log(`${'navigate to ' + name}`, params)
    navigationRef.current.navigate(name, params);
}

export function goBack(): void {
    navigationRef.current.goBack();
}

export function navigateReplace(name: string, params = {}): void {
    console.log(`${`navigate replace  ${name}`}`, params);
    navigationRef.current.dispatch(StackActions.replace(name, params));
}
