/**
*
* ArrowUpButton
*
*/

import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

import { palette } from 'assets/styles/theme';

const ArrowUpButton = (props) => (
  <IconButton
    {...props}
    style={{
      background: palette.primary1Color,
      borderRadius: '50%',
      color: 'white',
    }}
    iconStyle={{ color: 'white' }}
  >
    <ArrowUp />
  </IconButton>
);

ArrowUpButton.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

export default ArrowUpButton;
