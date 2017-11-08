
import React from 'react';
import './styles.css';

export default props =>
  <svg id="main" width="100" height="100" className={ props.className }>
    <circle className="colored"
      cx="50" cy="50" r="40">
    </circle>
  </svg>
