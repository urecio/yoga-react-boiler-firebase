/*
 *
 * Auth
 *
 */
import React, { PropTypes } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';

import cookie from 'react-cookie';

export default class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static PropTypes = {
    children: PropTypes.func,
    WorkerAuth: PropTypes.object,
    dispatch: PropTypes.func,
  }

  render() {
    return (
      <article>
        {React.Children.toArray(this.props.children)}
      </article>
    );
  }
}
