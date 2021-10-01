export default {
    syncUpdate: {
        appUpdate: 'App update',
        continue: 'Continue',
        install: 'Install',
        ignore: 'Skip',
        upToDate: 'Version is up to date',
        updateTitle: 'Update available',
        mandatoryUpdateMessage: 'An update needs to be installed:',
        optionalUpdateMessage: 'An update is available:',
        downloadingPackage: 'Downloading package...',
        installingUpdate: 'Installing update',
        updateInstalled: 'Update installed',
    },
    common: {
        defaultLanguage: 'English',
        close: 'Close',
        noText: 'No text',
        noData: 'No data',
        cancel: 'Cancel',
        confirm: 'Confirm',
        sendOTP: {
            title: 'Send OTP code',
            titleForgotPassword: 'If you forget your password',
            sendForgotPassword: 'Check',
            backButton: 'Return to previous screen',
            descriptionNext:
                'A notification email has been sent to the email address you entered. \n Enter the verification code and click the "Next" button. The expiration date is 24 hours.',
            descriptionConfirm:
                'A notification email has been sent to the email address you entered. \n Enter the verification code and press the "Confirm" button. The expiration date is 24 hours.',
            description:
                'A notification email has been sent to the email address you entered. \n Enter the verification code and press the "Register" button. The expiration date is 24 hours.',
            resend: 'Resend',
            buttonSend: 'Send',
            buttonNext: 'Next',
        },
        picker: {
            pickItem: 'Please select an item',
        },
        error: {
            unknown: 'Unknown error.',
            network: 'Network error.',
        },
    },

    // screens
    tab: {
        home: 'Home',
        notification: 'Notification',
        setting: 'Setting',
        account: 'Account',
    },
    authen: {
        login: {
            placeholderEmail: 'Email address required',
            placeholderPassword: 'Password required',
            buttonLogin: 'Login',
            rememberText: 'Keep logged in',
            forgotPasswordText: 'If you forgot your password, click here',
            registerText: 'Register now',
        },
        register: {
            title: 'Register now',
            emailPlaceholder: 'sample@demo.webcom',
            password: 'Password',
            passwordPlaceholder: 'Password required',
            passwordConfirm: 'Confirm password',
            backButton: 'Return to previous screen',
            photo: 'Photo',
            camera: 'Camera',
            cancel: 'Cancel',
        },
        sendEmail: {
            title: 'If you forget your password',
            sendButtonTitle: 'Next',
        },
    },
    home: {},
    account: {},
    notification: {},
    setting: {},

    // alert
    alert: {
        success: 'We sent you a new code.',
        invalidOTP: 'The OTP code is incorrect.',
    },

    // error
    error: {
        signIn: 'Email or password entered is incorrect.',
        infoInvalid: 'Invalid information.',
        notCompleted: 'Please fill in all the fields.',
        validatePassword: 'At least 6 characters of password.',
        passwordLength: 'At least 8 characters of password.',
        confirmPasswordLength: 'At least 8 character of confirm password.',
        passwordNotMatch: 'The new password you entered does not match. Please confirm.',
        duplicatePassword: 'Password is duplicated.',
        emailExisted: 'Email address has already been existed.',
        emailInvalid: 'The format of email address is incorrect.',
        emailEmpty: 'Please fill in email address.',
        emailNotRegister: 'Email address you entered has not been registered yet.',
        phoneInvalid: 'Phone number is invalid.',
        nameLength: 'Minimum is 5 characters and maximum is 8 characters.',
        trimSpace: 'Input cannot have space in start and end.',
        messageLength: 'Minimum is 1 character and maximum is 255 characters.',
        require: '{{field}} is required.',
        maxLength: 'The maximum length is {{len}}.',
        minLength: 'The minimum length is {{len}}.',
        inputComponent:
            'You need to wrap input by Form Provider or passing "form = useForm( ... )" into input component.',
    },
};
