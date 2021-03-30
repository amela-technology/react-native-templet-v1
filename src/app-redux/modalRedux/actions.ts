import ActionType from './types';

export const updateModalList = (data: any) => ({
    type: ActionType.UPDATE_LIST_MODALS,
    data,
});

export const deleteLastItemModalList = () => ({
    type: ActionType.DELETE_LAST_MODALS,
});
