module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                alias: {
                    "@base-component": ["/shared/components/common/"],
                    "@navigation": ["/service/navigation/"],
                },
            },
        ],
    ],
}
