/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionType from './types';

export const updateResource = (data: any): any => {
    return {
        type: ActionType.UPDATE_RESOURCE,
        data,
    };
};
