import {StatusBarStyle} from 'react-native';
import {Colors} from 'src/constants/colors';
import {Colors as UIColors} from 'react-native-ui-lib';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export const CommonTheme = {
  gridUnit: 4,
  fontFamily: 'AvenirNext-Regular',
  fontFamilies: {
    heavy: 'AvenirNext-Bold',
    bold: 'AvenirNext-Bold',
    demiBold: 'AvenirNext-DemiBold',
    medium: 'AvenirNext-Medium',
    regular: 'AvenirNext-Regular',
    light: 'AvenirNext-Regular',
  },
  fontSizes: {
    xxs: 11,
    xs: 13,
    s: 15,
    m: 17,
    l: 20,
    xl: 22,
    ['2xl']: 24,
    ['3xl']: 30,
    ['4xl']: 36,
    ['5xl']: 48,
    ['6xl']: 60,
    ['7xl']: 72,
    ['8xl']: 96,
    ['9xl']: 128,
  },
  fontWeights: {
    heavy: '900' as FontWeight,
    bold: '700' as FontWeight,
    demiBold: '600' as FontWeight,
    medium: '500' as FontWeight,
    regular: '400' as FontWeight,
    light: '200' as FontWeight,
  },
  iconSizes: {
    xs: 15,
    s: 17,
    m: 20,
    l: 22,
    xl: 28,
    xxl: 32,
  },
  blurType: 'regular',
  borderRadius: {
    s: 2,
    m: 4,
    l: 8,
    xl: 12,
    ['2xl']: 16,
    ['3xl']: 24,
    ['full']: 9999,
  }
};

export const LightTheme = {
  ...CommonTheme,
  barStyle: 'dark-content' as StatusBarStyle,
  shadows: {
    light: `
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.08);
    elevation: 2;`,
    medium: `
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
    elevation: 3;`,
  },
  colors: {
    primary: Colors.orange,
    onPrimary: Colors.black,
    contentOnPrimary: Colors.white,
    primaryLight: Colors.blueTint50,
    primaryDark: Colors.blueShade50,
    secondary: Colors.violet,
    onSecondary: Colors.black,
    background: Colors.offwhite,
    onBackground: Colors.black,
    contentOnBackground: Colors.white,
    text: Colors.black,
    onPastelGreen: Colors.white,
    contentOnPastelGreen: Colors.black,
    pastelGreenLight: Colors.pastelGreenTint30,
    info: Colors.turquoise,
    onInfo: Colors.black,
    success: Colors.successGreen,
    onSuccess: Colors.black,
    warning: Colors.warningOrange,
    onWarning: Colors.black,
    error: Colors.dangerRed,
    onError: Colors.white,
    errorOnPrimary: Colors.dangerRedShade50,
    ...Colors,
  },
  blurType: 'light',
};

export const DarkTheme = {
  ...CommonTheme,
  barStyle: 'light-content' as StatusBarStyle,
  shadows: {
    light: `
    box-shadow: 1px 1px 4px rgba(155, 155, 155, 0.08);
    elevation: 2;`,
    medium: `
    box-shadow: 0px 5px 5px rgba(255, 255, 255, 0.15);
    elevation: 3;`,
  },
  colors: {
    primary: Colors.orange,
    onPrimary: Colors.black,
    contentOnPrimary: Colors.white,
    primaryLight: Colors.blueTint50,
    primaryDark: Colors.blueShade50,
    secondary: Colors.violet,
    onSecondary: Colors.black,
    background: Colors.black,
    onBackground: Colors.white,
    contentOnBackground: Colors.white,
    text: Colors.offwhite,
    onPastelGreen: Colors.white,
    contentOnPastelGreen: Colors.black,
    pastelGreenLight: Colors.pastelGreenTint30,
    info: Colors.turquoise,
    onInfo: Colors.black,
    success: Colors.successGreen,
    onSuccess: Colors.black,
    warning: Colors.warningOrange,
    onWarning: Colors.black,
    error: Colors.dangerRed,
    onError: Colors.white,
    errorOnPrimary: Colors.dangerRedShade50,
    ...Colors,
  },
  blurType: 'dark',
};

export const DefaultTheme = LightTheme;

export type ThemeType = 'light' | 'dark' | 'system';

export const Themes: Record<ThemeType, typeof DefaultTheme> = {
  light: LightTheme,
  dark: DarkTheme,
  system: DefaultTheme,
};
