This project was developed by **Amela Technology**

Below you'll find information about performing common tasks.

# Table of Contents
- Introduction
- A. Getting started
- B. Available scripts
- C. Common errors
- D. Folder structure

# Introduction
-   Easy to start
-   React-native version 0.63.4
-   Fully using typescript for typing
-   Folder structure using package-by-feature (why)
-   Redux-toolkit, redux-saga, redux-persist, redux-logger
-   React-navigation v5
-   100% functional component with hooks
-   A lot of custom/base components
-   i18next for multiple languages
-   Custom hooks for share state logic between components
-   Eslint with Prettier plugin for checking code convention
-   Husky for pre-commit (we check lint to make sure we have no errors first when commit)
-   Amela React-native CLI

---
# A. Getting started
## I. Automatically with AMELA-RN-CLI
1. Install globally package `amela-rn-cli`
```
npm i -g amela-rn-cli
```
2. Move to a folder you use to create new project.
3. Run command below
```
amela-rn-cli
```
4. Choose mode 1 - **Create a new project**
5. Fill in these inputs: ***Project name***, ***Project display name***, ***App Code for Android keytool*** and ***repoURL*** in your command line.
6. Press `Enter` and enjoy.
7. For more information about AMELA-RN-CLI, please visit https://github.com/SpQuyt/amela-rn-cli

## II. Manually step-by-step method
### Installation
1. Clone this repo, `git clone https://github.com/amela-technology/react-native-templet-v1.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Open `package.json` and change the `name` property with your project name
5. Open `app.json` and replace `'ReactNativeBase'` by your project name
6. Remove to line 35, 36 `android` & `ios` in `.gitignore`
7. Run `yarn` or `npm install` to install dependencies
8. Run `npm run init-project` to create iOS & Android Folders.
9. Run your project with `npm run android` or `npm run ios`
10. If using CodePush, replace `project-name` in `package.json` by your project name in AppCenter.

### Setting up manually for iOS
1. Check workspaces of project in project/ios/${PROJECT_NAME}.xcworkspace
2. Go to Project workspaces in Xcode delete everything except project name
3. Should delete them in pod file
4. Setup react-native config following guide: https://docs.google.com/document/d/1sPg4N7iXEgD_NzbXBRD_SzHPo4p48uJIgG_fC9hK48s
### Setting up manually for Android
1. Setup modalize following guide: https://jeremybarbet.github.io/react-native-modalize/#/INSTALLATION
2. Setup react-native config following guide: https://docs.google.com/document/d/1sPg4N7iXEgD_NzbXBRD_SzHPo4p48uJIgG_fC9hK48s

---
# B. Available Scripts
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`
Runs your app in development mode.
```
npm start  --reset-cache
# or
yarn start  --reset-cache
```
### `npm run ios` or `yarn ios`
Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and already had it installed.

### `npm run android` or `yarn android`
Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator.

### `npm test` or `yarn test` *(in development)*
Runs the [jest](https://github.com/facebook/jest) test runner on your tests.
### `npm lint`
Run linter check source code

### `npm lint-fix`
Run linter fix source code

### `npm assets-link`
Link assets and font from **src/assets** to Native project

---
# C. Common errors
## iOS: Fix error "No permission handled detected"
1. Add this line to `Info.plist`:
```
<key>NSCameraUsageDescription</key>
<string>YOUR TO REQUEST CAMERA PERMISSION</string>
```
2. Add to `Podfile`:
```
target 'YourAwesomeProject' do
#... other code - add two line below
permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
#... other code - add two line above
end
```
3. Run `yarn` and `rebuild project`

---
# D. Folder structures
```
.   folder contain file to fixing, batch lib
├── README.md
├── __tests__
│   └── App-test.tsx
├── app.json
├── babel.config.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── react-native.config.js
├── scripts
│   ├── fix-lib.sh
│   ├── react-native-config
│   │   └── ReadDotEnv.rb
│   ├── react-native-keyboard-aware-scroll-view
│   │   └── lib
│   │       ├── KeyboardAwareFlatList.js
│   │       └── KeyboardAwareScrollView.js
│   ├── react-native-picker
│   │   └── index.d.ts
│   └── react-native-size-matters
│       └── scaling-utils.js
├── settings.json
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── modules
│   │   │   └── api-app
│   │   │       ├── authenticate.ts
│   │   │       ├── general.ts
│   │   │       └── notification.ts
│   │   └── request.ts
│   ├── app-redux
│   │   ├── sagas
│   │   │   ├── userInfoSaga.ts
│   │   │   ├── rootSaga.ts
│   │   │   └── resourceSaga.ts
│   │   ├── slices
│   │   │   ├── initSlice.ts
│   │   │   ├── languageSlice.ts
│   │   │   ├── userInfoSlice.ts
│   │   │   ├── types.ts
│   │   │   └── resourceSlice.ts
│   │   ├── hooks.ts
│   │   ├── store.ts
│   ├── assets
│   │   ├── fonts
│   │   │   ├── Montserrat-Light.ttf
│   │   │   ├── Montserrat-Regular.ttf
│   │   │   └── Montserrat-SemiBold.ttf
│   │   ├── icon
│   │   │   ├── ic_back.png
│   │   │   ├── ic_check_radio.png
│   │   │   ├── ic_home.png
│   │   │   ├── ic_notification.png
│   │   │   ├── ic_select.png
│   │   │   ├── ic_setting.png
│   │   │   └── ic_uncheck_radio.png
│   │   ├── images.ts
│   │   ├── locates
│   │   │   ├── en.ts
│   │   │   └── jp.ts
│   │   ├── metrics.ts
│   │   ├── photo
│   │   │   └── img_default_image.png
│   │   ├── sizes.ts
│   │   └── themes.ts
│   ├── components
│   │   ├── base
│   │   │   ├── AlertMessage.ts
│   │   │   ├── ProgressiveImage.tsx
│   │   │   ├── StyledButton.tsx
│   │   │   ├── StyledIcon.tsx
│   │   │   ├── StyledImage.tsx
│   │   │   ├── StyledIndicator.tsx
│   │   │   ├── StyledInput.tsx
│   │   │   ├── StyledInputForm.tsx
│   │   │   ├── StyledList.tsx
│   │   │   ├── StyledNoData.tsx
│   │   │   ├── StyledOverlayLoading.tsx
│   │   │   ├── StyledSectionList.tsx
│   │   │   ├── StyledText.tsx
│   │   │   ├── StyledTouchable.tsx
│   │   │   ├── StyledWebView.tsx
│   │   │   ├── index.ts
│   │   │   ├── list-view-selected
│   │   │   │   ├── StyledListViewSelected.tsx
│   │   │   │   └── components
│   │   │   │       └── ItemListViewSelected.tsx
│   │   │   ├── modal
│   │   │   │   ├── DialogComponent.tsx
│   │   │   │   ├── ModalComponent.tsx
│   │   │   │   ├── useLoading.tsx
│   │   │   │   └── useModal.tsx
│   │   │   └── picker
│   │   │       ├── StyledModalPicker.tsx
│   │   │       └── StyledPicker.tsx
│   │   └── common
│   │       └── StyledHeader.tsx
│   ├── feature
│   │   ├── account
│   │   │   └── AccountView.tsx
│   │   ├── authentication
│   │   │   ├── ChangePassword.tsx
│   │   │   ├── ForgotPwdScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── SendOtp.tsx
│   │   │   └── components
│   │   │       └── Logo.tsx
│   │   ├── chat
│   │   │   └── ChatScreen.tsx
│   │   ├── home
│   │   │   ├── HomeDataScreen.tsx
│   │   │   ├── HomeDetailScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── HomeUserListScreen.tsx
│   │   │   └── components
│   │   │       ├── HomeTabs.tsx
│   │   │       ├── ModalContent.tsx
│   │   │       ├── ModalContent2.tsx
│   │   │       └── UserCard.tsx
│   │   ├── notification
│   │   │   ├── NotificationScreen.tsx
│   │   │   └── components
│   │   │       └── HomeTabs.tsx
│   │   └── setting
│   │       ├── SettingScreen.tsx
│   │       └── components
│   │           └── HomeTabs.tsx
│   ├── hooks
│   │   ├── useApi.ts
│   │   ├── useInput.ts
│   │   ├── usePaging.ts
│   │   └── usePagingTakeAfter.ts
│   ├── navigation
│   │   ├── NavigationService.ts
│   │   ├── components
│   │   │   └── StyledTabBar.tsx
│   │   ├── config
│   │   │   ├── options.ts
│   │   │   ├── routes.ts
│   │   │   └── transition.ts
│   │   └── scene
│   │       ├── AuthScenes.tsx
│   │       ├── RootScenes.tsx
│   │       └── TabScenes.tsx
│   └── utilities
│       ├── CommonInterface.ts
│       ├── SocketProvider.tsx
│       ├── authenticate
│       │   ├── AuthenticateService.ts
│       │   └── TokenProvider.ts
│       ├── context
│       │   └── APIProvider.tsx
│       ├── format.ts
│       ├── helper.ts
│       ├── i18next.ts
│       ├── logger.ts
│       ├── notification
│       │   └── index.ts
│       ├── permissions
│       │   └── index.ts
│       ├── staticData.ts
│       ├── types
│       │   └── typing.d.ts
│       ├── upload
│       │   ├── ImagePicker.tsx
│       │   └── ImageUploader.ts
│       ├── validate.ts
│       └── yupValidate.ts
├── tsconfig.json
└── yarn.lock

49 directories, 124 files
```
