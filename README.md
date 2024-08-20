This project was developed by **Amela Technology**

Below you'll find information about performing common tasks.

# Table of Contents

- Introduction
- A. Getting started
- B. Available scripts
- C. Common errors
- D. Template folder structures
- E. [Document run and deploy](/template/RUN_DEPLOY.md)
- F. Roadmap

# Introduction

- Easy to start
- React-native version 0.75.1
- Fully using typescript for typing
- Folder structure using package-by-feature (why)
- Redux-toolkit, redux-saga, redux-persist, redux-logger
- React-navigation v6
- 100% functional component with hooks
- A lot of custom/base components
- i18next for multiple languages
- Custom hooks for share state logic between components
- Eslint with Prettier plugin for checking code convention
- Husky for pre-commit (we check lint to make sure we have no errors first when commit)

---

# A. Getting started

### <mark>[!] Note before installation</mark>

> - _NodeJS version must be >= **version 18**_
> - _Android Studio must be >= **version Koala**_
> - _CocoaPods must be >= **version 1.15.2**_
> - _Must install [patch-package](https://github.com/ds300/patch-package)._
> - _This template uses Yarn 3 locally_

### Installation

1. **Use `yarn` <mark>[Recommended]</mark>**

- Must installed **yarn** before.
- npx react-native init **your-project-name** --template react-native-template-amela --pm yarn --skip-git-init true --install-pods true --verbose

  > _`npx react-native init TestProject --template react-native-template-amela --pm yarn --skip-git-init true --install-pods true --verbose`_

2. **Use `npm`**

- npx react-native init **your-project-name** --template react-native-template-amela --skip-git-init true --install-pods true --verbose

  > _`npx react-native init TestProject --template react-native-template-amela --skip-git-init true --install-pods true --verbose`_

### <mark>[!] Note after installation</mark>

> - _Copy all installed files and folders into your GIT project._
> - _Copy **.gitignore** file from **THIS REPOSITORY** into your GIT project (**.gitignore** is removed while `npx react-native init`)_
> - _Duplicate file **.env.development** from folder **environment** to your root project. Rename to **.env** https://prnt.sc/K23PXoWJ19tn_

### ~~Some manual setups (Deprecated)~~

~~1. Setup react-native config (Amela-style) following guide (deprecated - need upgrade): https://docs.google.com/document/d/1sPg4N7iXEgD_NzbXBRD_SzHPo4p48uJIgG_fC9hK48s |~~
~~2. Setup modalize following guide: https://jeremybarbet.github.io/react-native-modalize/#/INSTALLATION~~

---

# B. Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start` or `yarn start`

Runs your app in development mode.

```
npm start  --reset-cache
# or
yarn start  --reset-cache
```

### `npm test` or `yarn test` (in development)

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

### `yarn commit`

Show list commit types to choose and execute commits (using commit-lint).

---

# C. Common errors

---

# D. Document run and deploy

[Document run and deploy](/template/RUN_DEPLOY.md)

# F. Road-map

- [x] Convert base into `react-native-cli` template.
- [ ] New way of using `react-hook-form`.
- [ ] Move to Expo template.
