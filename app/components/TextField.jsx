import React from 'react';
import TextField from 'material-ui/TextField';
import { custom } from 'assets/styles/theme';

export default (props) => {
  const defaultProps = {
    hintStyle: custom.TextFieldHint,
    style: custom.TextFieldInput,
  };
  const extendedProps = Object.assign({}, defaultProps, props);

  return <TextField {...extendedProps} />;
};
