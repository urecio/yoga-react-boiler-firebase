/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
// styles

import styles from './styles';

// material ui components
import LoginFormComponent from './LoginFormComponent';

export default class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <styles.components.StyledLoginComponent>
        <img src="" className="logo-yoga-builder" alt="Logo Yoga builder" />
        <div className="filter"></div>
        <section className="login-box">
          <LoginFormComponent {...this.props} />
        </section>
      </styles.components.StyledLoginComponent>
    );
  }
}
