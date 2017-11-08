/*
 *
 * Dashboard
 *
 */

// react
import { connect } from 'react-redux';

// components
import Dashboard from './DashboardComponent';

import * as authActions from '../Auth/actions';
import * as actions from './actions';

function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => dispatch(authActions.signOutRequest()),
    getMySessions: () => dispatch(actions.getMySessionsRequest()),
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
