import { ActionType } from './types'

export const updateResource = (data: any) => {
    return {
        type: ActionType.UPDATE_RESOURCE,
        data,
    }
}
