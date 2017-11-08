/*
 *
 * Login
 *
 */
import { connect } from 'react-redux';

// selectors
import { createStructuredSelector } from 'reselect';
import makeSelectAuth from './selectors';

// actions
import * as actions from './actions';

import LoginComponent from './LoginComponent';

const mapStateToProps = createStructuredSelector({
  Auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (username, password, platform) => dispatch(
      actions.loginRequest({ username, password, platform })
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
