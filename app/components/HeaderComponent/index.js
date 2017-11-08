/**
*
* DashboardNav
*
*/

import React from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import mindsforlifeLogo from 'assets/img/mindsforlife-logo-white.png';

import styles from './styles';

class DashboardHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    iconElementRight: React.PropTypes.object,
  };

  render() {
    return (
      <AppBar
        style={styles.inline.header.appbar}
        iconStyleLeft={styles.inline.header.appBarLeftIcon}
        iconElementLeft={<Link to="/dashboard/chat"><img src={mindsforlifeLogo} alt="Mindsforlife logo" height="25px" /></Link>}
        iconElementRight={this.props.iconElementRight}
      />
    );
  }
}

export default DashboardHeader;
