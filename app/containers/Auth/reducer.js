/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';

import { decodeToken } from 'jwt-js';

import cookie from 'react-cookie';

import * as constants from './constants';

const initialState = fromJS({

});

function setAuthCookie(action) {
  const credentials = decodeToken(action.payload.accessToken).payload;

  cookie.save('auth', {
    expiresAt: action.payload.expiresAtTimestamp * 1000,
    expiresAtTimestamp: action.payload.expiresAtTimestamp,
    expiresInMillisecs: action.payload.expiresInMillisecs,
    user: {
      id: action.payload.user.id,
      avatar: action.payload.user.avatar.url.svg,
      username: action.payload.user.username,
      mentorId: action.payload.user.mentor.id,
      firstname: action.payload.user.firstname,
      lastname: action.payload.user.lastname,
      email: action.payload.user.email,
    },
    platform: credentials.platforms[0],
    accessToken: action.payload.accessToken,
  }, { path: '/' });
}

function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_RESPONSE: {
      setAuthCookie(action);
      return state;
    }
    case constants.REFRESH_TOKEN_RESPONSE: {
      setAuthCookie(action);
      return state;
    }
    case constants.SIGNOUT_RESPONSE: {
      cookie.remove('auth', { path: '/' });
      return state;
    }
    default:
      return state;
  }
}

export default AuthReducer;
