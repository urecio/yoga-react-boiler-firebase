import styled from 'styled-components';
import { palette, custom } from 'assets/styles/theme';

export default {
  components: {
    StyledLoginComponent: styled.article`
      height: 100vh;
      display: flex;

      .filter {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 3;
        opacity: 0.3;
      }

      .logo-mindsforlife {
        position: absolute;
        top: 40px;
        left: 40px;
        z-index: 4;
      }

      .login-box {
        width: 300px;
        margin: 30px auto;
        z-index: 4;
      }
    `,
    StyledForm: styled.form`
      display: flex;
      flex-direction: column;

      & > * {
        margin-bottom: 25px;
      }

      .asg {

        text-align: center;

        button {
          opacity: 0.7;
          transition: opacity 0.5s;

          color: ${palette.primary1Color};

          &.selected, &:hover {
            cursor: pointer;
            opacity: 1;
            p {
              font-weight: 300;
              color: green;
            }
          }

          p {
            margin: 0;
            text-transform: uppercase;
          }
        }
      }
      .login-button {
        height: 40px !important;
        height: 40px !important;
        border: 1px solid !important;
        color: green !important;
        &:hover {
          color: white !important;
          border-color: ${palette.primary1Color} !important;
        }
      }
    `,
  },
  inline: {
    loginTextFieldHint: Object.assign({}, custom.TextFieldHint, {
      textAlign: 'center',
      width: '100%',
      fontWeight: 300,
      color: 'green',
    }),
    loginTextInput: Object.assign({}, custom.TextFieldInput, {
      textAlign: 'center',
      width: '100%',
      fontWeight: 300,
      color: 'green',
    }),
  },
};
