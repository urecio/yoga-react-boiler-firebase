import { takeLatest, call, put } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from '../../utils/Api';

function* getMySessions() {
  try {
    const response = yield call(api.getMySessions);
    yield put(actions.getMySessionsResponse(response));
  } catch (error) { console.error('error on getMySessions', error); }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(constants.GET_MY_SESSIONS_REQUEST, getMySessions);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
