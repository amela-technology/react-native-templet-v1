/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* @flow */

import { FlatList } from 'react-native';
import listenToKeyboardEvents from './KeyboardAwareHOC';

const config = {
    enableOnAndroid: true,
};

export default listenToKeyboardEvents(config)(FlatList);
