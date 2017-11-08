import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import warning from 'warning';
import createReducer from 'reducers';
import RtcClient from 'utils/rtcClient';
import cookie from 'react-cookie';

import * as authActions from 'containers/Auth/actions';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
    );

    sagas.map(store.runSaga);
  };
}

let tokenRefreshTimeoutId;

function setRefreshTimeoutIfMissing(store) {
  if (cookie.load('auth') && !tokenRefreshTimeoutId) {
    tokenRefreshTimeoutId = setTimeout(() => refreshToken(store), cookie.load('auth').expiresInMillisecs * 0.1);
  }
}

function refreshToken(store) {
  clearTimeout(tokenRefreshTimeoutId);
  tokenRefreshTimeoutId = null;
  store.dispatch(authActions.refreshTokenRequest());
  setRefreshTimeoutIfMissing(store);
}

function redirectToDashboardIfpossible(store, nextState, replace) {
  setRefreshTimeoutIfMissing(store);

  if (!nextState.location.pathname.indexOf('passwordreset')
    && !nextState.location.pathname.match(/dashboard\/?$/)) {
    replace({
      pathname: '/dashboard/welcome',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}
function redirectToLogin(nextState, replace) {
  // will erase the cookie too
  cookie.remove('auth', { path: '/' });
  clearTimeout(tokenRefreshTimeoutId);
  // redirect
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname },
  });
}

function isAuthExpired() {
  return cookie.load('auth') && cookie.load('auth').expiresAt <= Date.now();
}

export let rtcClient = null; // eslint-disable-line

export function redirectToDashboardIfLoggedIn(store, nextState, replace) {
  if (nextState.location.pathname.indexOf('dashboard') === -1 && !isAuthExpired()) {
    redirectToDashboardIfpossible(store, nextState, replace);
  } else if (nextState.location.pathname === '/') redirectToLogin(nextState, replace);
}

export function redirectToLoginIfNotLoggedIn(store, nextState, replace) {
  const isLoggedIn = !isAuthExpired();
  if (!isLoggedIn) {
    redirectToLogin(nextState, replace);
  } else {
    // if it's logged in and rtc is not instantiated, we do it
    if (isLoggedIn && !rtcClient) rtcClient = new RtcClient(store);

    redirectToDashboardIfpossible(store, nextState, replace);
  }
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}
