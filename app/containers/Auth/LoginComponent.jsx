/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import videoUrl from 'assets/login-video.mp4';
import logo from 'assets/img/logo.png';
// styles

import styles from './styles';

// material ui components
import LoginFormComponent from './LoginFormComponent';

export default class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <styles.components.StyledLoginComponent>
        <img src={logo} className="logo-mindsforlife" alt="Logo Mindsforlife" />
        <div className="filter"></div>
        <section className="login-box">
          <LoginFormComponent {...this.props} />
        </section>
      </styles.components.StyledLoginComponent>
    );
  }
}
