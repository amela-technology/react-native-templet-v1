This project was development by **CuongNm base on https://github.com/amela-technology/react-native-templet-v1**

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

6. Remove to line 35, 36 `android` & `ios` in `.gitignore`

7. Run `yarn` or `npm install` to install dependencies

8. Run `npm run init-project` to create iOS & Android Folders.

9. Run your project with `npm run android` or `npm run ios` 

## Getting Started IOS

1. Check workspaces of project in project/ios/${PROJECT_NAME}.xcworkspace
2. Go to Project workspaces in Xocde delete everything except project name
3. Should delete them in pod file 
4. Setup react-native config following guide: https://docs.google.com/document/d/1EGlP-Z0OAfJ0n6DIHD1iQEFvZFulwKvD/edit

## Getting Started Android

1. Setup modalize following guide: https://jeremybarbet.github.io/react-native-modalize/#/INSTALLATION
2. Setup react-native config following guide: https://docs.google.com/document/d/1EGlP-Z0OAfJ0n6DIHD1iQEFvZFulwKvD/edit

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
│   ├── sizes.ts
│   └── themes.ts
├── feature
│   ├── home
│   │   ├── HomeView.tsx
│   │   ├── components
│   │   │   └── HomeTabs.tsx
│   │   ├── redux
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   ├── saga.ts
│   │   │   └── types.ts
│   │   └── styles.ts
│   ├── login
│   │   ├── LoginView.tsx
│   │   ├── components
│   │   │   └── Logo.tsx
│   │   ├── redux
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   ├── saga.ts
│   │   │   └── types.ts
│   │   └── styles.ts
│   └── splash
│       └── SplashView.tsx
├── services
│   └── api
│       ├── AuthApi.ts
│       ├── CommentApi.ts
│       ├── UserApi.ts
│       └── config
│           ├── request.ts
│           └── urls.ts
└── navigation
│       ├── NavigationHelpers.ts
│       ├── NavigationService.ts
|       ├── sence
│       │   └── RootSences.ts
│       └── config
│           ├── AppContainer.ts
│           ├── routes.ts
│           └── transition.ts
├── shared
│   ├── components
│   │   └── base
│   │       ├── StyledButton.tsx
│   │       ├── StyledImage.tsx
│   │       ├── StyledInput.tsx
│   │       ├── StyledList.tsx
│   │       ├── StyledNoData.tsx
│   │       ├── StyledText.tsx
│   │       ├── StyledTouchable.tsx
│   │       └── index.ts
│   ├── hooks
│   │   ├── useApi.ts
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

24 directories, 54 files


```
