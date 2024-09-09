/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/ui';
import 'react-native-url-polyfill/auto'

AppRegistry.registerComponent(appName, () => App);
