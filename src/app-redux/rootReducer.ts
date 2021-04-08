import { combineReducers } from 'redux';
import resource from './resource/reducer';
import userInfo from './userInfo/reducer';
import modalRedux from './modalRedux/reducer';

const rootReducer = combineReducers({
    resource,
    userInfo,
    modalRedux,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
