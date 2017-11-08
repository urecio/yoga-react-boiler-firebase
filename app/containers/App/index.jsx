// react
import React from 'react';

// Styles for the grid
import Notifications from 'react-notify-toast';

// styles
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './styles';
import theme from 'assets/styles/theme';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Notifications />
          {React.Children.toArray(this.props.children)}
        </div>
      </MuiThemeProvider>
    );
  }
}
