export default {
    common: {
        defaultLanguage: 'English',
        close: '閉じる',
        noText: 'テキストなし',
        noData: 'データなし',
        cancel: 'キャンセル',
        confirm: '決定',
    },
    modalInput: {
        title: 'hello',
        close: 'Close',
        button: 'displayModal1',
    },
    tab: {
        home: 'Home',
        notification: 'Notification',
        setting: 'Setting',
    },
    alert: {
        button: {
            no: 'いいえ',
            yes: 'はい',
        },
    },
    noData: {
        noDataList: 'データはありません',
        noDataRateList: '評価がまだありません',
        noDataHoliday: 'なし',
    },
    login: {
        placeholderEmail: 'メールアドレス',
        placeholderPassword: 'パスワード',
        buttonLogin: 'ログイン',
        rememberText: 'ログイン状態を保持',
        forgotPasswordText: 'パスワードを忘れた方はこちら',
        registerText: '新規会員登録はこちら',
    },
    register: {
        emailPlaceholder: 'sample@demo.webcom',
        password: 'パスワード',
        passwordPlaceholder: 'パスワード',
    },
    registerAccount: {
        password: 'パスワード',
        passwordConfirm: 'パスワード（再入力）',
        backButton: '前の画面',
        title: '新規会員登録はこちら',
        passwordPlaceholder: 'パスワード',
    },
    validateMessage: {
        signIn: '入力されたイメルまたはパスワードが正しくありません。',
        infoInvalid: 'Info invalid',
        notCompleted: '全ての項目に入力してください',
        emailNotRegister: '入力したメールアドレスがまだ登録されていません',
        validatePassword: 'パスワードは半角英数字で6文字以上入力する必要があります',
        emailInvalid: 'メールアドレスの形式が間違っています。',
        passwordLength: 'At least 6 character of password',
        confirmPasswordLength: 'At least 6 character of confirm password',
        passwordNotMatch: '入力された新パスワードが一致しません。ご確認ください。',
        emailEmpty: '全ての項目を入力してください。',
        messageLength: '1文字以上 255文字以内',
    },
    sendOTPMessage: {
        success: '新規コードを送りました。',
        invalidOTP: '認証コードは正しくありません。',
    },
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
    errorMessage: {
        emailExisted: 'メールアドレスが既に存在します',
    },
    sendEmail: {
        title: 'パスワードを忘れた',
        sendButtonTitle: '次へ',
    },
    picker: {
        pickItem: 'アイテムを選択してください',
    },
    input: {
        errorComponent: 'You need wrap input by Form Provider or passing "form = useForm( ... )" into input component',
    },
};
