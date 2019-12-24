This project was development by **Amela Technology**

Below you'll find information about performing common tasks.

## Table of Contents

## Integration to new project
1. Create new React Native project. Please read [the official React Native document](https://facebook.github.io/react-native/docs/getting-started) for more information
2. Copy this file/folder listed below from templet project to your new project:
   - File package.json
        - Copy all element `script`, `devDependencies`, `jest`
        - `dependencies`: exclude react and react-native
        - Run `npm assets-link`  for link assets to native project
        - Run `npm outdate` for update new version dependencies
   - File babel.config.js, jest.config.js, metro.config.js, react-native-config.js, .gitignore
   - Folder src (keep all file contain) 
## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

```
npm start  --reset-cache
# or
yarn start  --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. 

#### `npm lint`
 Run linter check source code
 
#### `npm lint-fix`
 Run linter fix source code
 
#### `npm assets-link`
 Link assets and font from **src/assets** to Native project
## Folder structures
```
├── App.tsx
├── AppContext.tsx
├── assets
│   ├── fonts
│   │   ├── Montserrat-Light.ttf
│   │   ├── Montserrat-Regular.ttf
│   │   └── Montserrat-SemiBold.ttf
│   ├── fonts.ts
│   ├── images
│   ├── images.ts
│   ├── locates
│   │   ├── en.ts
│   │   └── jp.ts
│   ├── metrics.ts
│   └── themes.ts
├── feature
│   ├── home
│   │   ├── HomeView.tsx
│   │   ├── components
│   │   │   └── HomeTabs.tsx
│   │   ├── redux
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   └── saga.ts
│   │   └── styles.ts
│   ├── login
│   │   ├── LoginView.tsx
│   │   ├── components
│   │   │   └── Logo.tsx
│   │   ├── redux
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   └── saga.ts
│   │   └── styles.ts
│   └── splash
│       └── SplashView.tsx
├── services
│   ├── api
│   │   ├── HomeAPI.ts
│   │   ├── LoginAPI.ts
│   │   └── config.ts
│   ├── codepush
│   │   └── config.ts
│   └── navigation
│       ├── AppNavigation.ts
│       ├── NavigationHelpers.ts
│       ├── NavigationService.ts
│       └── config
│           ├── Routes.ts
│           └── Transition.ts
├── shared
│   ├── components
│   │   ├── AMButton.tsx
│   │   ├── AMImage.tsx
│   │   ├── AMInput.tsx
│   │   ├── AMList.tsx
│   │   ├── AMListNoData.tsx
│   │   ├── AMText.tsx
│   │   └── AMTouchable.tsx
│   ├── hooks
│   │   ├── NavigationHooks.ts
│   │   ├── useInfinityScroll.ts
│   │   └── useInput.ts
│   ├── store
│   │   ├── rootReducer.ts
│   │   ├── rootSaga.ts
│   │   └── store.ts
│   └── utilities
│       ├── helper.ts
│       └── i18next.ts
└── types
    └── typing.d.ts

23 directories, 49 files
```
