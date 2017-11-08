import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

import { palette } from 'assets/styles/theme';

const StyledWrapper = styled.div`

  height: 100%;
  display: flex;
  justify-content: middle;
  text-align: 'center';

  .svg-success {
    stroke-width: 2px;
    stroke: ${palette.primary1Color};
    fill:none;
    & path {
      stroke-dasharray:17px, 17px;
      stroke-dashoffset: 0px;
      -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
      animation: checkmark 0.25s ease-in-out 0.7s backwards;
    }
    & circle {
      stroke-dasharray:76px, 76px;
      stroke-dashoffset: 0px;
      transform:rotate(-90deg);
      transform-origin: 50% 50%;
      -webkit-animation: checkmark-circle 0.6s ease-in-out forwards;
      animation: checkmark-circle 0.6s ease-in-out forwards;
    }
  }

  @keyframes checkmark {
      0% {
          stroke-dashoffset: 17px;
      }

      100% {
          stroke-dashoffset: 0
      }
  }

  @keyframes checkmark-circle {
      0% {
          stroke-dashoffset: 76px;
      }
      100% {
          stroke-dashoffset: 0px;
      }
  }

`;

let svgElem;

export default class SuccessAnimationComponent extends React.Component {

  static propTypes = {
    shouldReloadAnimation: React.PropTypes.func,
  };

  // TODO: check how to trigger the animation
  // componentDidMount() {
  //   this.reloadAnimation();
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.shouldReloadAnimation === true) this.reloadAnimation();
  // }
  //
  // reloadAnimation() {
  //   ReactDOM.findDOMNode(this).innerHTML = ReactDOM.findDOMNode(this).innerHTML;
  // }

  render() {
    return <StyledWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-263.5 236.5 26 26" style={{ margin: 'auto' }}>
        <g className="svg-success">
          <circle cx="-250.5" cy="249.5" r="12"/>
          <path d="M-256.46 249.65l3.9 3.74 8.02-7.8"/>
        </g>
      </svg>
    </StyledWrapper>;
  }
}
