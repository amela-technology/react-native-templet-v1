import { fork } from 'redux-saga/effects';
import resourceSaga from './resourceSaga';
import userInfoSaga from './userInfoSaga';

export default function* rootSaga() {
    yield fork(resourceSaga);
    yield fork(userInfoSaga);
}
