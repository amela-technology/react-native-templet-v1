/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* @flow */

import { ScrollView } from 'react-native';
import listenToKeyboardEvents from './KeyboardAwareHOC';

export default listenToKeyboardEvents({ enableOnAndroid: true })(ScrollView);
