module.exports = {
    root: true,
    extends: [
        'airbnb-base',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',
        'plugin:import/errors',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', '@typescript-eslint', 'react-hooks', 'import'],
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        'import/resolver': {
            typescript: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        'global-require': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/consistent-type-definitions': ['off'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/camelcase': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'no-console': 1,
        'react/self-closing-comp': 'error',
        'unused-imports/no-unused-vars-ts': 'off',
        'no-multi-spaces': 'warn',
        'react/sort-comp': [
            1,
            {
                order: ['static-methods', 'everything-else', 'rendering'],
                groups: {
                    rendering: ['/^render.+$/', 'render'],
                },
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-use-before-define': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        'react/display-name': 'off',
    },
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
};
