import getMuiTheme from 'material-ui/styles/getMuiTheme';

const palette = {
  primary1Color: '#6DB33F',
  primary2Color: '#0079C1',
  primary3Color: '#009688',
  primary4Color: '#f3fffd',
  primary5Color: '#2E3440',
  primary6Color: '#cee2c1',
  primary7Color: '#78c347',
  fontFamily: 'Roboto, sans-serif',
  textColor: this.primary1Color,
  disabledColor: this.primary3Color,
  borderColor: this.primary1Color,
  secondaryTextColor: '#8D8A8A', // buttons
  alternateTextColor: this.primary4Color,
};

const custom = {
  defaultFontWeight: 200,
  blueGradientHeader: `linear-gradient(${palette.primary2Color}, #43a6e0)`,
  margin: '20px',
  headerHeight: '110px',
  TextFieldHint: {
    color: palette.primary4Color,
    fontWeight: this.defaultFontWeight,
  },
  TextFieldInput: {
    color: palette.primary1Color,
    fontWeight: this.defaultFontWeight,
  },
  rainbowBorder: `
    border: 1px solid transparent;
    border-image: linear-gradient(to right, ${palette.primary1Color} 0%,${palette.primary1Color} 60%, ${palette.primary2Color} 61%, ${palette.primary2Color} 100%);
    border-image-slice: 1;
  `,
};

const card = {
  fontWeight: custom.defaultFontWeight,
  boxShadow: 'none',
  border: '1px solid transparent',
  borderImage: `linear-gradient(to right, ${palette.primary1Color} 0%,${palette.primary1Color} 60%, ${palette.primary2Color} 61%, ${palette.primary2Color} 100%)`,
  borderImageSlice: 1,
};

export default getMuiTheme({
  palette,
  card,
  raisedButton: {
    secondaryColor: palette.primary2Color,
  },
  custom,
});

export {
  palette,
  custom,
};
