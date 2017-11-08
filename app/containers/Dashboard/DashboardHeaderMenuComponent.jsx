/**
*
* DashboardNav
*
*/

import React from 'react';

import cookie from 'react-cookie';

import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import styles from './styles';
import menu from 'assets/img/menu.png';

export default class DashboardHeaderMenuComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  PropTypes = {
    onSignOut: React.PropTypes.func.isRequired,
  };

  state = {
    open: false,
  };

  toggleMenu = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    return (
      <div>
        <IconButton
          onClick={this.toggleMenu}
        >
          <img
            src={menu}
            width="30px"
            />
        </IconButton>
        <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={() => this.setState({ open: false })}
          >
            <Menu>
              <MenuItem primaryText="Sign out" onClick={() => this.props.onSignOut()} />
            </Menu>
          </Popover>
      </div>
    );
  }
}
