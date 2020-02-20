import {ActionType} from './types'

export function updateResource(data: any) {
    return {
        type: ActionType.UPDATE_RESOURCE,
        data,
    }
}
