import {ActionType} from 'shared/store/resource/types'

const initialState: any = {}

export default function(state = initialState, action: any) {
    switch (action.type) {
        case ActionType.UPDATE_RESOURCE:
            return Object.assign({}, state, {
                ...action.data,
            })
        default:
            return state
    }
}
