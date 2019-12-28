This project was development by **Amela Technology**

Below you'll find information about performing common tasks.

## Table of Contents
...
## Introdution
- Easy to start
- React native version 0.61.5
- Fully using typescript for typing
- Folder structs using package-by-feature (why)
- Redux, redux-saga, redux-persist, redux-logger
- React navigation v4 (we have plan for upgrade to v5 when release)
- 100% functional component with hook
- Alot of custom components
- i18next for multiple language
- Custom hooks for share state logic between components
- Eslint using prettier plugin for checking code convention
- Husky for pre-commit (we check lint have no errors first when commit)


## Getting Started

1. Clone this repo, `git clone https://github.com/amela-technology/react-native-templet-v1.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder,  `rm -rf .git`
4. Open `package.json` and change the `name` property with your project name
5. Open `app.json` and replace `'ReactNativeBase'` by your project name 

6. Run `yarn` or `npm install` to install dependencies

7. Run `npm run init-project` to create iOS & Android Folders.

8. Run your project with `npm run android` or `npm run ios` 
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
.
├── App.tsx
├── AppContext.tsx
├── api
│   ├── HomeAPI.ts
│   ├── LoginAPI.ts
│   └── config.ts
├── assets
│   ├── fonts
│   │   ├── Montserrat-Light.ttf
│   │   ├── Montserrat-Regular.ttf
│   │   └── Montserrat-SemiBold.ttf
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
│   │   ├── AMNoData.tsx
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
│       ├── Helper.ts
│       └── i18next.ts
└── types
    └── typing.d.ts

22 directories, 47 files

```
