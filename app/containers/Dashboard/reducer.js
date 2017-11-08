/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';
import moment from 'moment';

const initialState = fromJS({
  session: {},
});

const getDiffStartsAtInMinutesFromNow = (session) => {
  const now = moment.utc();
  const startsAt = moment(session.startsAt);
  return moment.duration(startsAt.diff(now)).asMinutes();
};

const getDiffEndsAtInHoursFromNow = (session) => {
  const now = moment.utc();
  const endsAt = moment(session.endsAt);
  return moment.duration(endsAt.diff(now)).asHours();
};

// will get (sorted by start date) all the sessions that has started and not ended
// and within the time frame of the session (+ one hour)
const getNextSession = (session) => {
  if (!session) return false;

  const diffStartsAtInMinutes = getDiffStartsAtInMinutesFromNow(session);
  const diffEndsAtInHours = getDiffEndsAtInHoursFromNow(session);

  return !session.ended && diffStartsAtInMinutes <= 15 && diffEndsAtInHours >= -1;
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_MY_SESSIONS_RESPONSE: {
      const session = action.payload.results.filter(getNextSession)[0] || initialState.get('session');
      if (session.id) session.diffStartsAtInMinutes = getDiffStartsAtInMinutesFromNow(session);
      return state.set('session', session);
    }
    case constants.SESSION_STARTED_RESPONSE:
      return state.set('session', Object.assign({}, state.get('session'), { started: true }));
    case constants.SESSION_ENDED_RESPONSE:
      return state.set('session', Object.assign({}, state.get('session'), { ended: false }));
    case constants.PRE_START_SESSION:
      return state.set('session', Object.assign({}, state.get('session'), { preStarted: true }));
    default:
      return state;
  }
}

export default dashboardReducer;
