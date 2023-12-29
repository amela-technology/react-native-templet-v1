/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-async-storage/async-storage` depending on where you get it from
    .configure({})
    .useReactNative()
    .use(reactotronRedux() as any)
    .connect();

export default reactotron;
