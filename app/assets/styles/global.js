import { injectGlobal } from 'styled-components';
import { palette } from 'assets/styles/theme';

/* eslint no-unused-expressions: 0 */
injectGlobal`

  * {
    font-family: Roboto, sans-serif;
    font-weight: 200;
  }

  #app {
    background-color: #fafafa;
  }

  .toast-notification {
    z-index: 1400 !important;
  }

  /* open tok popup for explorer */
  iframe {
    z-index: 1300 !important;
  }

  input:required {
    box-shadow: none;
  }

  a {
    text-decoration: none;
  }

  p {
    font-weight: 200;
  }

  button {
    outline: none;
  }

  .text-green {
    color: ${palette.primary1Color};
  }

  .button-link {
    border: none;
    color: ${palette.primary3Color};
    transition: color 0.3s;
    &:hover {
      cursor: pointer;
      color: ${palette.primary2Color};
    }
    &.white-to-blue {
      color: white;
      &:hover {
        color: ${palette.primary2Color};
      }
    }
    &.blue-to-white {
      color: ${palette.primary2Color};
      &:hover {
        color: white;
      }
    }
  }

  .card-header, .card-footer {
    height: 110px;
  }

  .card-header {
    background-color: ${palette.primary1Color};
    text-align: center;
    color: white;
    text-transform: uppercase;
    & > * {
      margin: 10px auto;
    }
    & > p {
      margin-top: 20px;
    }
  }

  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v29/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
  }

  .material-icons, [class^="material-icon-"] {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  .material-icon-hardware-arrowleft:before {
    content: "keyboard_arrow_left";
  }
  .material-icon-navigation-menu:before {
    content: "menu";
  }
  .material-icon-action-list:before {
    content: "list";
  }
  .material-icon-action-event:before {
    content: "event";
  }
  .material-icon-communication-message:before {
    content: "message";
  }
  .material-icon-social-group:before {
    content: "group";
  }
  .material-icon-navigation-arrowdown:before {
    content: "arrow_drop_down";
  }
  .material-icon-navigation-arrowup:before {
    content: "arrow_drop_up";
  }
  .material-icon-removed-red-eye:before {
    content: "remove_red_eye";
  }
  .material-icon-lock-outline:before {
    content: "lock_outline";
  }
  .material-icon-input:before {
    content: "input";
  }
`;
