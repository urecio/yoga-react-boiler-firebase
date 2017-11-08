import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default (props) => {
  const defaultProps = {
    buttonStyle: { height: 'auto' },
    overlayStyle: { padding: '10px', height: 'auto' },
  };
  const extendedProps = Object.assign({}, defaultProps, props);

  return <RaisedButton {...extendedProps} />;
};
