import ActionType from './types';

interface ModalReducerProps {
    actionOpening: boolean;
    list: Array<any>;
}

const initialState: ModalReducerProps = {
    actionOpening: true,
    list: <any>[],
};

const modalRedux = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionType.UPDATE_LIST_MODALS: {
            state.list.push(action.data);
            return {
                ...state,
                actionOpening: true,
                list: state.list,
            };
        }
        case ActionType.DELETE_LAST_MODALS: {
            return {
                ...state,
                actionOpening: false,
                list: [],
            };
        }
        default:
            return state;
    }
};

export default modalRedux;
