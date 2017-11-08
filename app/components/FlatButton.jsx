import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import { palette } from 'assets/styles/theme';

export default (props) => {
  const defaultProps = {
    backgroundColor: palette.primary1Color,
    hoverColor: palette.primary7Color,
    labelStyle: { color: 'white' },
    style: { padding: '10px', color: 'white', height: 'auto' },
    label: 'button',
  };
  const extendedProps = Object.assign({}, defaultProps, props);

  return <FlatButton {...extendedProps} />;
};
