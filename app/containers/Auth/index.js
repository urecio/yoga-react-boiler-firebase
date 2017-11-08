/*
 *
 * Auth
 *
 */
import { connect } from 'react-redux';

// components
import AuthComponent from './AuthComponent';

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(AuthComponent);
