import * as constants from './constants';

export function getMySessionsRequest() {
  return {
    type: constants.GET_MY_SESSIONS_REQUEST,
  };
}

export function getMySessionsResponse(payload) {
  return {
    type: constants.GET_MY_SESSIONS_RESPONSE,
    payload,
  };
}

export function sessionStartedResponse() {
  return {
    type: constants.SESSION_STARTED_RESPONSE,
  };
}

export function sessionEndedResponse() {
  return {
    type: constants.SESSION_ENDED_RESPONSE,
  };
}

export function preStartSession() {
  return {
    type: constants.PRE_START_SESSION,
  };
}
