This project was development by **Amela Technology**

Below you'll find information about performing common tasks.

## Table of Contents

...

## Introdution

-   Easy to start
-   React native version 0.63.4
-   Fully using typescript for typing
-   Folder structs using package-by-feature (why)
-   Redux-toolkit, redux-saga, redux-persist, redux-logger
-   React navigation v5
-   100% functional component with hook
-   Alot of custom components
-   i18next for multiple language
-   Custom hooks for share state logic between components
-   Eslint using prettier plugin for checking code convention
-   Husky for pre-commit (we check lint have no errors first when commit)

## Getting Started

1. Clone this repo, `git clone https://github.com/amela-technology/react-native-templet-v1.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Open `package.json` and change the `name` property with your project name
5. Open `app.json` and replace `'ReactNativeBase'` by your project name

6. Remove to line 35, 36 `android` & `ios` in `.gitignore`

7. Run `yarn` or `npm install` to install dependencies

8. Run `npm run init-project` to create iOS & Android Folders.

9. Run your project with `npm run android` or `npm run ios`
10. If using codepush, replace `project-name` in `package.json` by your project name in appcenter.

## Getting Started IOS

1. Check workspaces of project in project/ios/${PROJECT_NAME}.xcworkspace
2. Go to Project workspaces in Xocde delete everything except project name
3. Should delete them in pod file
4. Setup react-native config following guide: https://docs.google.com/document/d/1sPg4N7iXEgD_NzbXBRD_SzHPo4p48uJIgG_fC9hK48s

## Note: Fix error "No permission handled detected".

Add this line to `Info.plist`:

```
<key>NSCameraUsageDescription</key>
<string>YOUR TO REQUEST CAMERA PERMISSION</string>
```

Add to `Podfile`:

```
target 'YourAwesomeProject' do
#... other code - add two line below
permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
#... other code - add two line above
end
```

Run `yarn` and `rebuild project`

## Getting Started Android

1. Setup modalize following guide: https://jeremybarbet.github.io/react-native-modalize/#/INSTALLATION
2. Setup react-native config following guide: https://docs.google.com/document/d/1sPg4N7iXEgD_NzbXBRD_SzHPo4p48uJIgG_fC9hK48s

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

.   folder contain file to fixing, batch lib
├── scripts
│   ├── react-native-keyboard-aware-scroll-view
│   │   └── lib
│   │       ├── KeyboardAwareFlatList.js
│   │       └── KeyboardAwareScrollView.js
│   ├── react-native-size-matters
│   │   └── scaling-utils.js
│   └── fix-lib.sh
|   folder contain source code of project
├── src
|   |   folder contain api content of project
│   ├── api
│   │   ├── modules
│   │   │   └── api-app
│   │   │       └── general.ts
│   │   ├── request.ts
│   │   └── urls.ts
│   ├── assets
│   │   ├── fonts
│   │   │   ├── Montserrat-Light.ttf
│   │   │   ├── Montserrat-Regular.ttf
│   │   │   └── Montserrat-SemiBold.ttf
│   │   ├── icon
│   │   │   ├── ic_back.png
│   │   │   ├── ic_check_radio.png
│   │   │   ├── ic_home.png
│   │   │   ├── ic_notification.png
│   │   │   ├── ic_select.png
│   │   │   ├── ic_setting.png
│   │   │   └── ic_uncheck_radio.png
│   │   ├── locates
│   │   │   ├── en.ts
│   │   │   └── jp.ts
│   │   ├── images.ts
│   │   ├── metrics.ts
│   │   ├── sizes.ts
│   │   └── themes.ts
│   ├── components
│   │   ├── base
│   │   │   ├── modal
│   │   │   │   ├── DialogComponent.tsx
│   │   │   │   ├── ModalComponent.tsx
│   │   │   │   ├── useLoading.tsx
│   │   │   │   └── useModal.tsx
│   │   │   ├── picker
│   │   │   │   └── StyledPicker.tsx
│   │   │   ├── StyledButton.tsx
│   │   │   ├── StyledIcon.tsx
│   │   │   ├── StyledImage.tsx
│   │   │   ├── StyledInput.tsx
│   │   │   ├── StyledInputForm.tsx
│   │   │   ├── StyledList.tsx
│   │   │   ├── StyledNoData.tsx
│   │   │   ├── StyledOverlayLoading.tsx
│   │   │   ├── StyledSectionList.tsx
│   │   │   ├── StyledText.tsx
│   │   │   ├── StyledTouchable.tsx
│   │   │   └── index.ts
│   │   └── common
│   │       └── Browser.tsx
│   ├── feature
│   │   ├── authentication
│   │   │   ├── components
│   │   │   │   └── Logo.tsx
│   │   │   ├── ForgotPwdScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── home
│   │   │   ├── components
│   │   │   │   └── HomeTabs.tsx
│   │   │   └── HomeScreen.tsx
│   │   ├── notification
│   │   │   ├── components
│   │   │   │   └── HomeTabs.tsx
│   │   │   └── NotificationScreen.tsx
│   │   └── setting
│   │       ├── components
│   │       │   └── HomeTabs.tsx
│   │       └── SettingScreen.tsx
│   ├── hooks
│   │   ├── useApi.ts
│   │   ├── useInput.ts
│   │   └── usePaging.ts
│   ├── navigation
│   │   ├── components
│   │   │   └── StyledTabBar.tsx
│   │   ├── config
│   │   │   ├── options.ts
│   │   │   ├── routes.ts
│   │   │   └── transition.ts
│   │   ├── scene
│   │   │   └── RootScenes.tsx
│   │   └── NavigationService.ts
│   ├── redux
│   │   ├── sagas
│   │   │   ├── userInfoSaga.ts
│   │   │   ├── rootSaga.ts
│   │   │   └── resourceSaga.ts
│   │   ├── slices
│   │   │   ├── userInfoSlice.ts
│   │   │   ├── types.ts
│   │   │   └── resourceSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── utilities
│   │   ├── authenticate
│   │   │   ├── AuthenticateService.ts
│   │   │   └── TokenProvider.ts
│   │   ├── types
│   │   │   └── typing.d.ts
│   │   ├── upload
│   │   │   ├── ImageUploader.ts
│   │   │   └── awsApi.ts
│   │   ├── format.ts
│   │   ├── helper.ts
│   │   ├── i18next.ts
│   │   ├── logger.ts
│   │   ├── SocketProvider.tsx
│   │   ├── staticData.ts
│   │   └── validate.ts
│   ├── App.tsx
│   └── AppContext.tsx
├── README.md
├── app.json
├── babel.config.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── react-native.config.js
├── settings.json
├── tsconfig.json
└── yarn.lock

38 directories, 88 files


```
