/**
 * @format
 */

import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import App from '../src/App';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
    renderer.create(<App />);
});
