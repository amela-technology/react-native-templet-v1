import ActionType from './types';

const initialState: any = {};

const Resource = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ActionType.UPDATE_RESOURCE:
            return { ...state, ...action.data };
        default:
            return state;
    }
};

export default Resource;
