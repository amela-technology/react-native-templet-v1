export default {
    common: {
        defaultLanguage: 'English',
        close: '閉じる',
        noText: 'テキストなし',
        noData: 'データなし',
        cancel: 'キャンセル',
        confirm: '決定',
        sendOTP: {
            title: '認証コード',
            titleForgotPassword: 'パスワードを忘れた',
            sendForgotPassword: '確認',
            backButton: '前の画面',
            descriptionNext:
                '入力したメールアドレスに通知メールを送信しました。\n 認証コードを入力し、「次へ」ボタンを押してください。有効期限は24時間です。',
            descriptionConfirm:
                '入力したメールアドレスに通知メールを送信しました。\n 認証コードを入力し、「確認」ボタンを押してください。有効期限は24時間です。',
            description:
                '入力したメールアドレスに通知メールを送信しました。認証コードを入力し、「登録」ボタンを押してください。有効期限は24時間です。',
            resend: '再送信',
            buttonSend: '登録',
            buttonNext: '次へ',
        },
        picker: {
            pickItem: 'アイテムを選択してください',
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
            placeholderEmail: 'メールアドレス',
            placeholderPassword: 'パスワード',
            buttonLogin: 'ログイン',
            rememberText: 'ログイン状態を保持',
            forgotPasswordText: 'パスワードを忘れた方はこちら',
            registerText: '新規会員登録はこちら',
        },
        register: {
            title: '新規会員登録はこちら',
            emailPlaceholder: 'sample@demo.webcom',
            password: 'パスワード',
            passwordPlaceholder: 'パスワード',
            passwordConfirm: 'パスワード（再入力）',
            backButton: '前の画面',
            photo: 'Photo',
            camera: 'Camera',
            cancel: 'cancel'
        },
        sendEmail: {
            title: 'パスワードを忘れた',
            sendButtonTitle: '次へ',
        },
    },
    home: {},
    account: {},
    notification: {},
    setting: {},

    // alert
    alert: {
        success: '新規コードを送りました。',
        invalidOTP: '認証コードは正しくありません。',
    },

    // error
    error: {
        signIn: '入力されたイメルまたはパスワードが正しくありません。',
        infoInvalid: 'Info invalid',
        notCompleted: '全ての項目に入力してください',
        validatePassword: 'パスワードは半角英数字で6文字以上入力する必要があります',
        passwordLength: 'At least 6 character of password',
        confirmPasswordLength: 'At least 6 character of confirm password',
        passwordNotMatch: '入力された新パスワードが一致しません。ご確認ください。',
        duplicatePassword: 'Password is duplicate',
        emailExisted: 'メールアドレスが既に存在します',
        emailInvalid: 'メールアドレスの形式が間違っています。',
        emailEmpty: '全ての項目を入力してください。',
        emailNotRegister: '入力したメールアドレスがまだ登録されていません',
        phoneInvalid: 'Phone number is invalid',
        nameLength: 'At least 6 character of password',
        trimSpace: 'Input cannot have space in start and end',
        messageLength: '1文字以上 255文字以内',
        require: '{{field}} is required.',
        maxLength: 'The maximum length is {{len}}.',
        minLength: 'The minimum length is {{len}}.',
        inputComponent: 'You need wrap input by Form Provider or passing "form = useForm( ... )" into input component',
    },
};
