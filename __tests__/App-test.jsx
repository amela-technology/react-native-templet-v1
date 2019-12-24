"use strict";
/**
 * @format
 */
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("react-native");
var App_1 = require("../src/App");
// Note: test renderer must be required after react-native.
var react_test_renderer_1 = require("react-test-renderer");
it("renders correctly", function () {
    react_test_renderer_1.default.create(<App_1.default />);
});
