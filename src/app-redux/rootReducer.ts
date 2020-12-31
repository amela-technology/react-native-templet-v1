import { combineReducers } from 'redux';
import resource from './resource/reducer';
import userInfo from './userInfo/reducer';

const rootReducer = combineReducers({
    resource,
    userInfo,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
