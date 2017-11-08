
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { notify } from 'react-notify-toast';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import TextField from 'components/TextField';

import styles from './styles';
import { palette } from 'assets/styles/theme';

export default class LoginFormComponent extends React.PureComponent {

  static propTypes = {
    onLogin: PropTypes.func,
  }

  state = {
    username: '',
    password: '',
    errors: {},
    submitted: false,
  }

  componentDidMount() {
    // hack ahead!
    // Sorry about this, they made me do it
    // Material ui does not realise that the input has changed when the browser autocompletes it
    // so, this has to be done
    setTimeout(() => {
      ReactDOM.findDOMNode(this).querySelectorAll('.text-field-username input')[0].addEventListener('input', (e) => {
        this.setState({ username: e.target.value });
      });
      ReactDOM.findDOMNode(this).querySelectorAll('.text-field-password input')[0].addEventListener('input', (e) => {
        this.setState({ password: e.target.value });
      });
      const username = ReactDOM.findDOMNode(this).querySelectorAll('.text-field-username input')[0].value;
      const password = ReactDOM.findDOMNode(this).querySelectorAll('.text-field-password input')[0].value;
      this.setState({
        username,
        password,
      });
    }, 100);
  }

  onSubmit = (e) => {
    e.preventDefault();
    // getting data from fields
    this.setState({ submitted: true });
    const { username, password } = this.state;

    this.props.onLogin(
      username, password, asg
    );
  }

  render() {
    return (
      <styles.components.StyledForm onSubmit={this.onSubmit}>
        <TextField
          hintStyle={styles.inline.loginTextFieldHint}
          inputStyle={styles.inline.loginTextInput}
          type="text"
          hintText="username"
          fullWidth
          required
          className="text-field-username"
          value={this.state.username}
        />
        <TextField
          hintStyle={styles.inline.loginTextFieldHint}
          inputStyle={styles.inline.loginTextInput}
          type="password"
          hintText="password"
          fullWidth
          required
          className="text-field-password"
          value={this.state.password}
        />
        <FlatButton
          label="GET STARTED"
          className="login-button"
          primary
          hoverColor={palette.primary1Color}
          fullWidth
          type="submit"
        />
      </styles.components.StyledForm>
    );
  }
}
