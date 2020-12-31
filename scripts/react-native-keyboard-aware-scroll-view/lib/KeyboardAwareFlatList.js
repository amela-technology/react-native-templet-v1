/* @flow */

import { FlatList } from 'react-native';
import listenToKeyboardEvents from './KeyboardAwareHOC';

const config = {
    enableOnAndroid: true,
};

export default listenToKeyboardEvents(config)(FlatList);
