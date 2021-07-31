import { AnyAction, CaseReducer, createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';
import { CommonStatus } from './types';

interface IUser {
    id: number;
    username: string;
    // ...
}

interface IUserInfoState {
    token?: string;
    refreshToken?: string;
    user?: IUser;
    status: CommonStatus;
    error?: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<IUserInfoState, A>;

const initialState: IUserInfoState = {
    status: CommonStatus.IDLE,
};

const getUserInfoRequest: Reducer<PayloadAction<string>> = (state) => {
    state.status = CommonStatus.LOADING;
    delete state.error;
};

const getUserInfoSuccess: Reducer<PayloadAction<IUser>> = (state, { payload }) => {
    state.status = CommonStatus.SUCCESS;
    state.user = payload;
};

const getUserInfoFailed: Reducer<PayloadAction<any>> = (state, { payload }) => {
    state.status = CommonStatus.ERROR;
    state.error = payload;
};

const updateToken: Reducer<PayloadAction<Pick<IUserInfoState, 'token' | 'refreshToken'>>> = (state, { payload }) => {
    state.token = payload.token;
    state.refreshToken = payload.refreshToken;
};

const logOut: Reducer = (state) => {
    delete state.token;
    delete state.refreshToken;
    delete state.user;
    delete state.error;
    state.status = CommonStatus.IDLE;
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        getUserInfoRequest,
        getUserInfoSuccess,
        getUserInfoFailed,
        updateToken,
        logOut,
    },
});

const persistConfig = generatePersistConfig('userInfo', ['token', 'refreshToken', 'user']);

export const userInfoActions = userInfoSlice.actions;
export default persistReducer<IUserInfoState>(persistConfig, userInfoSlice.reducer);
