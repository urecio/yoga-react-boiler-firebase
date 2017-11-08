/*
 *
 * Auth actions
 *
 */

import * as constants from './constants';

export const loginRequest = (payload) => ({
  type: constants.LOGIN_REQUEST,
  payload,
});

export const loginResponse = (payload) => ({
  type: constants.LOGIN_RESPONSE,
  payload,
});

export const refreshTokenResponse = (payload) => ({
  type: constants.REFRESH_TOKEN_RESPONSE,
  payload,
});

export const refreshTokenRequest = () => ({
  type: constants.REFRESH_TOKEN_REQUEST,
});

export const signOutRequest = () => ({
  type: constants.SIGNOUT_REQUEST,
});

export const signOutResponse = () => ({
  type: constants.SIGNOUT_RESPONSE,
});
