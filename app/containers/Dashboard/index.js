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

function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => dispatch(authActions.signOutRequest()),
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
