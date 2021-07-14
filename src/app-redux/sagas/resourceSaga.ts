import { getResources } from 'api/modules/api-app/general';
import { resourceActions } from 'app-redux/slices/resourceSlice';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

function* handleGetResourceRequest() {
    try {
        const response: AxiosResponse<any> = yield call(getResources);
        yield put(resourceActions.getResourceSuccess(response.data));
    } catch (error) {
        yield put(resourceActions.getResourceFailed(error));
    }
}

export default function* resourceSaga() {
    yield takeLatest(resourceActions.getResourceRequest.type, handleGetResourceRequest);
}
