
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

import sexualAbuseImg from 'assets/img/sexual-abuse.png';
import addictionImg from 'assets/img/addiction.png';
import anxietyImg from 'assets/img/anxiety.png';
import counsellingImg from 'assets/img/counselling.png';
import depressionImg from 'assets/img/depression.png';
import eatingImg from 'assets/img/eating-disorders.png';
import panicImg from 'assets/img/panic.png';
import griefImg from 'assets/img/grief.png';

const applicationServiceGroups = [
  { id: 'COUNSELLING', displayName: 'Counselling', image: counsellingImg },
  // { id: 'GRIEF', displayName: 'Grief', image: griefImg },
  // { id: 'SEXUAL', displayName: 'Sexual abuse', image: sexualAbuseImg },
  // { id: 'ADDICTION', displayName: 'Addiction', image: addictionImg },
  // { id: 'ANXIETY', displayName: 'Anxiety', image: anxietyImg },
  // { id: 'DEPRESSION', displayName: 'Depression', image: depressionImg },
  // { id: 'EATING', displayName: 'Eating disorders', image: eatingImg },
  // { id: 'PANIC', displayName: 'Panic', image: panicImg },
]

export default class LoginFormComponent extends React.PureComponent {

  static propTypes = {
    onLogin: PropTypes.func,
  }

  state = {
    username: '',
    password: '',
    errors: {},
    asg: 'COUNSELLING', // counselling by default as we only have one for now
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
    const { username, password, asg } = this.state;

    // validating
    if (!this.state.asg)
      notify.show('Please, select an application', 'error');
    else this.props.onLogin(
      username, password, asg
    );
  }

  render() {
    return (
      <styles.components.StyledForm onSubmit={this.onSubmit}>
        <section className="asg-container">
          {
            applicationServiceGroups.map(asg =>
              <div className="asg" key={asg.id}>
                <button
                  type="button"
                  onClick={(e) => this.setState({ asg: asg.id })}
                  className={ this.state.asg === asg.id ? 'selected' : '' }
                >
                  <img src={asg.image} alt={`${asg.displayName} logo`}/>
                  <p>{asg.displayName}</p>
                </button>
              </div>)
          }
        </section>
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
