module.exports = {
    assets: ['./src/assets/fonts'],
    dependencies: {
        'react-native-code-push': {
            platforms: {
                android: null,
            },
        },
        ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
    },
    project: {
        android: {},
        ios: {},
    },
};
