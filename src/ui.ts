import { Assets as UIAssets, Colors as UIColors, Typography } from "react-native-ui-lib";
import {Colors} from './constants/colors';
import { CommonTheme as theme } from "src/theme";

export const Assets = {

};

export const loadConfig = () => {
  UIColors.loadColors({
    primary: Colors.blue,
  });

  // Default: node_modules/react-native-ui-lib/src/style/designTokens.d.ts
  UIColors.loadSchemes({
    light: {
      pageBG: Colors.offwhite,
      primary: Colors.orange,
      $backgroundDefault: Colors.offwhite,
      $textDefault: Colors.black,
      textColor: UIColors.red1,
      moonOrSun: UIColors.yellow30,
      mountainForeground: UIColors.green30,
      mountainBackground: UIColors.green50,
      pastelGreen: Colors.pastelGreen,
      pastelPink: Colors.pastelPink,
      gray: Colors.gray,
    },
    dark: {
      pageBG: Colors.black,
      primary: Colors.orange,
      $backgroundDefault: Colors.black,
      $textDefault: Colors.offwhite,
      textColor: UIColors.red1,
      moonOrSun: UIColors.grey80,
      mountainForeground: UIColors.violet10,
      mountainBackground: UIColors.violet20,
      pastelGreen: Colors.pastelGreen,
      pastelPink: Colors.pastelPink,
      gray: Colors.gray,
    },
  });

  UIAssets.loadAssetsGroup('images', Assets);

  Typography.loadTypographies({
    h1: {fontSize: theme.fontSizes['4xl'], fontFamily: 'AvenirNext-Regular'},
    h2: {fontSize: theme.fontSizes['3xl'], fontFamily: 'AvenirNext-Regular'},
    h3: {fontSize: theme.fontSizes.xl, fontFamily: 'AvenirNext-Regular'},
    h4: {fontSize: theme.fontSizes.l, fontFamily: 'AvenirNext-Regular'},
    body: {fontSize: theme.fontSizes.m, fontFamily: 'AvenirNext-Regular'},
    callout: {fontSize: 16, fontFamily: 'AvenirNext-Regular'},
    subhead: {fontSize: theme.fontSizes.s, fontFamily: 'AvenirNext-Regular'},
    footnote: {fontSize: theme.fontSizes.xs, fontFamily: 'AvenirNext-Regular'},
    caption1: {
      fontSize: theme.fontSizes.xs,
      textTransform: 'uppercase',
      fontFamily: 'AvenirNext-Regular',
    },
    caption2: {
      fontSize: theme.fontSizes.xxs,
      textTransform: 'uppercase',
      fontFamily: 'AvenirNext-Regular',
    },
    light: {
      fontFamily: 'AvenirNext-Regular',
      fontWeight: theme.fontWeights.light,
    },
    italic: {fontFamily: 'AvenirNext-Italic', fontWeight: '400'},
    regular: {
      fontFamily: 'AvenirNext-Regular',
      fontWeight: theme.fontWeights.regular,
    },
    medium: {
      fontFamily: 'AvenirNext-Medium',
      fontWeight: theme.fontWeights.medium,
    },
    demiBold: {
      fontFamily: 'AvenirNext-DemiBold',
      fontWeight: theme.fontWeights.demiBold,
    },
    bold: {fontFamily: 'AvenirNext-Bold', fontWeight: theme.fontWeights.bold},
    heavy: {fontFamily: 'AvenirNext-Bold', fontWeight: theme.fontWeights.heavy},
    ls1: {letterSpacing: 1},
    ls2: {letterSpacing: 2},
    smallEmoji: {fontSize: theme.fontSizes['3xl']},
    peopleLikeYouEmoji: {fontSize: theme.fontSizes['4xl']},
    mediumEmoji: {fontSize: theme.fontSizes['6xl']},
    largeEmoji: {fontSize: theme.fontSizes['8xl']},
    infoEmoji: {fontSize: theme.fontSizes['7xl']},
    headerPage: {fontSize: theme.fontSizes['4xl'], fontFamily: 'Bukhari Script'},
    largeHeaderPage: {fontSize: theme.fontSizes['5xl'], fontFamily: 'Bukhari Script'},
    brand: {fontSize: theme.fontSizes.m, fontFamily: 'Shrikhand-Regular'},
    largeBrand: {fontSize: theme.fontSizes['5xl'], fontFamily: 'Shrikhand-Regular'},
    hugeBrand: {fontSize: 80, fontFamily: 'Shrikhand-Regular'},
  });
};
