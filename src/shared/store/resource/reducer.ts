import { ActionType } from 'shared/store/resource/types'

const initialState: any = {}

const Resource = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ActionType.UPDATE_RESOURCE:
            return { ...state, ...action.data }
        default:
            return state
    }
}
export default Resource
