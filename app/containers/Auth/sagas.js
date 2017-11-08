import { browserHistory } from 'react-router';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from '../../utils/Api';

function* login(action) {
  try {
    const response = yield call(api.login, action.payload);
    yield put(actions.loginResponse(response));

    browserHistory.push('/dashboard/welcome');
  } catch (error) { console.error('error on login'); }
}

function* refreshToken() {
  try {
    const response = yield call(api.refreshToken, true);
    yield put(actions.refreshTokenResponse(response));
  } catch (error) {
    yield put(actions.signOutResponse());

    browserHistory.push('/login');
  }
}

function* signOut() {
  try {
    yield put(actions.signOutResponse());
    browserHistory.push('/login');
  } catch (error) { console.error('error on signout'); }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(constants.LOGIN_REQUEST, login);
  yield takeLatest(constants.REFRESH_TOKEN_REQUEST, refreshToken);
  yield takeLatest(constants.SIGNOUT_REQUEST, signOut);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
