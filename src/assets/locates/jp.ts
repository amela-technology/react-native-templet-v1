export default {
    syncUpdate: {
        appUpdate: 'アプリ更新',
        continue: '次へ',
        install: 'インストール',
        ignore: 'スキップ',
        upToDate: '最新バージョン',
        updateTitle: '利用可能なアップデート',
        mandatoryUpdateMessage: 'アップデートをインストールするには確認が必要です：',
        optionalUpdateMessage: 'アップデート利用可能：',
        downloadingPackage: 'パッケージのダウンロード。。。',
        installingUpdate: 'インストールされている。。。',
        updateInstalled: 'インストールされました！',
    },
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
                '入力したメールアドレスに通知メールを送信しました。\n 認証コードを入力し、「登録」ボタンを押してください。有効期限は24時間です。',
            resend: '再送信',
            buttonSend: '登録',
            buttonNext: '次へ',
        },
        picker: {
            pickItem: 'アイテムを選択してください',
        },
        error: {
            unknown: '不明なエラーが発生しました。',
            network: 'エラーが発生しました。暫くしてから、もう一度試してください。',
        },
    },

    // screens
    tab: {
        home: 'ホーム',
        notification: '通知',
        setting: '設定',
        account: 'アカウント',
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
            photo: '画像',
            camera: 'カメラ',
            cancel: 'キャンセル',
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
        infoInvalid: '情報は正しくありません。',
        notCompleted: '全ての項目に入力してください。',
        validatePassword: 'パスワードは半角英数字で6文字以上入力する必要があります。',
        passwordLength: 'パスワードは8文字以上で入力してください。',
        confirmPasswordLength: '確認パスワードは文字以上を入力してください。',
        passwordNotMatch: '入力された新パスワードが一致しません。ご確認ください。',
        duplicatePassword: 'パスワードは二重されました。',
        emailExisted: 'メールアドレスが既に存在します。',
        emailInvalid: 'メールアドレスの形式が間違っています。',
        emailEmpty: '全ての項目を入力してください。',
        emailNotRegister: '入力したメールアドレスがまだ登録されていません。',
        phoneInvalid: '電話番号は正しくありません。',
        nameLength: '5文字から8文字までに入力してください。',
        trimSpace: '文頭や文末には空白文字を入力しないでください。',
        messageLength: '1文字以上 255文字以内。',
        require: '{{field}}は記入必須の項目です。',
        maxLength: '8文字以内で入力してください。',
        minLength: '8文字以上で入力してください。',
        inputComponent:
            'You need to wrap input by Form Provider or passing "form = useForm( ... )" into input component.',
    },
};
