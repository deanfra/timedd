type Theme = {
  color: { [key: string]: string}
}

const mColors = {
  purple50: '#ede7f6',
  purple100: '#d1c4e9',
  purple200: '#b39ddb',
  purple300: '#9575cd',
  purple400: '#7e57c2',
  purple500: '#673ab7',
  purple600: '#5e35b1',
  purple700: '#512da8',
  purple800: '#4527a0',
  purple900: '#311b92',
  purpleA100: '#b388ff',
  purpleA200: '#7c4dff',
  purpleA400: '#651fff',
  purpleA700: '#6200ea',
  green50: '#e8f5e9',
  green100: '#c8e6c9',
  green200: '#a5d6a7',
  green300: '#81c784',
  green400: '#66bb6a',
  green500: '#4caf50',
  green600: '#43a047',
  green700: '#388e3c',
  green800: '#2e7d32',
  green900: '#1b5e20',
  greenA100: '#b9f6ca',
  greenA200: '#69f0ae',
  greenA400: '#00e676',
  greenA700: '#00c853',

};

export default {
  color: {
    primary: mColors.purple700,
    primaryVariant: mColors.purple900,
    secondary: mColors.greenA700,
    secondaryVariant: mColors.greenA100,
    secondaryDarker: mColors.green900,
    border: '#546E7A',
    grey: '#292929',
    black: '#000',
    white: '#fff',
  },
} as Theme;
