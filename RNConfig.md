## Giới thiệu

Khi phát triển app, developer bắt buộc phải sử dụng biến môi trường:

-   Môi trường DEV: Phát triển ứng dụng trên local
-   Môi trường STAGING (Tuỳ dự án): Build ứng dụng trước khi đẩy lên production
-   Môi trường PRODUCTION: Build cho end user
    Để cài đặt biến môi trường hãy sử dụng thư viện react-native-config. Link: <https://github.com/luggit/react-native-config>

## Cài đặt cho iOS

## Phân môi trường + Thêm vào file .env

-   Trong Xcode. Mở Product > Scheme > Edit Scheme
-   Click Duplicate Scheme ở bottom
-   Đổi tên theo cấu trúc: “Tên dự án” + “Môi trường (Production, Staging)”
-   Set chế độ “Shared” để có thể push lên git.
    ![1](https://user-images.githubusercontent.com/30967592/102459009-a34dc180-4077-11eb-9759-0ebecb6eeecd.png)

-   Sau khi tạo xong hãy trỏ đường dẫn file .env tham chiếu với môi trường vừa tạo Pre-actions => New Run Script Action
    `echo ".env.production" > /tmp/envfile #` replace .env.production for your current environment
    ![2](https://user-images.githubusercontent.com/30967592/102459028-ac3e9300-4077-11eb-9a94-6ed303e6b12d.png)

-   Thêm key vào file env
    ![3](https://user-images.githubusercontent.com/30967592/102459034-ae085680-4077-11eb-93ab-fe4350bcc1c5.png)

## Thiết lập cho Build settings

-   Bấm vào cây thư mục và tạo 1 file mới dạng XCConfig
    ![4](https://user-images.githubusercontent.com/30967592/102459035-ae085680-4077-11eb-8582-b3832507913a.png)

    ![5](https://user-images.githubusercontent.com/30967592/102459036-aea0ed00-4077-11eb-9d32-ea2f8b6b6e02.png)

-   Lưu file đó dưới tên Config.xcconfig với nội dung như sau:
    `#include? "tmp.xcconfig"`
-   Thêm dòng sau vào file .gitignore:

`react-native-config codegen`
`ios/tmp.xcconfig`

-   Đi tới Project settings và apply file Config.xcconfig mình vừa tạo
    ![6](https://user-images.githubusercontent.com/30967592/102459038-af398380-4077-11eb-8120-438decb4a859.png)

-   Tạo 1 Build phase cho scheme mình vừa tạo. Thêm dòng bên dưới vào sau phần “echo … > tmp/envfile”
    `"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"`
    ![7](https://user-images.githubusercontent.com/30967592/102459071-b8c2eb80-4077-11eb-83ea-0f6a3278b441.png)

## Run project sau đó chuyển sang bước tiếp theo

-   Đi tới project của bạn ⇒ Build Settings ⇒ All
    ![8](https://user-images.githubusercontent.com/30967592/102459083-bbbddc00-4077-11eb-9af3-8f49cf346f3c.png)

-   Tìm kiếm với từ khóa preprocess
    Đổi `Preprocess Info.plist File` thành `Yes`
    Đổi `Info.plist Preprocessor Prefix File` thành `${BUILD_DIR}/GeneratedInfoPlistDotEnv.h`
    Đổi `Info.plist Other Preprocessor Flags` thành `-traditional`
    Nếu không thấy thì vui lòng check lại xem “All” đã được chọn ở trên cùng nhé (Thường được hay chọn là “Basic”)
    ![9](https://user-images.githubusercontent.com/30967592/102459085-bc567280-4077-11eb-9ff5-c78a0f860fd5.png)

## Thiết lập cho Info.plist

-   Đi tới file Info.plist
    Đổi `CFBundleDisplayName` thành `RNC_APP_NAME`
    Đổi `CFBundleShortVersionString` thành `RNC_IOS_APP_VERSION_CODE`
    Đổi `CFBundleVersion` thành `RNC_IOS_APP_BUILD_CODE`
    ![10](https://user-images.githubusercontent.com/30967592/102459087-bcef0900-4077-11eb-861b-25cfd1ff3cfa.png)

## Cài đặt cho Android

-   Trước hết bạn nên có 1 file .keystore (vì môi trường production sẽ cần đến cái này). Lệnh để gen ra file keystore:
    `keytool -genkeypair -v -keystore DEMO-key.keystore -alias DEMO-alias -keyalg RSA -keysize 2048 -validity 10000`
    (Nhớ thay thế DEMO thành tên keystore bạn muốn nhé. Sau đó đặt vào folder android/app)
    ![11](https://user-images.githubusercontent.com/30967592/102459089-bcef0900-4077-11eb-88c4-fdc5192372f3.png)

-   Mở thư mục android, mở file gradle.properties lên và thêm dòng này vào cuối file đó:
    `MYAPP_UPLOAD_STORE_FILE=DEMO-key.keystore`
    `MYAPP_UPLOAD_KEY_ALIAS=DEMO-alias`
    `MYAPP_UPLOAD_STORE_PASSWORD=<<password của bạn>>`
    `MYAPP_UPLOAD_KEY_PASSWORD=<<password của bạn>>`
    Mình nghĩ nên để password là amela@123 để cho dễ nhớ.
    ![12](https://user-images.githubusercontent.com/30967592/102459091-bd879f80-4077-11eb-999b-a4383cda97ae.png)

-   Mở thư mục android, mở folder app, mở file build.gradle
    Copy đoạn này lên trên cùng của file build.gradle

        `project.ext.envConfigFiles = [`
        `dev: ".env.development",`
        `staging: ".env.staging",`
        `product: ".env.production",`
        `anothercustombuild: ".env",`
        `]`

    ![13](https://user-images.githubusercontent.com/30967592/102459092-be203600-4077-11eb-94f5-4078f2114a46.png)

-   Tìm đến dòng có `apply from: "../../node_modules/react-native/react.gradle"`, copy dòng sau xuống ngay dưới
    `apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"`
    ![14](https://user-images.githubusercontent.com/30967592/102459096-bf516300-4077-11eb-810f-4febb8540f0c.png)

-   Tìm đến `android.defaultConfig`, ví dụ project Honeything như sau:
    ![15](https://user-images.githubusercontent.com/30967592/102459097-bfe9f980-4077-11eb-9945-2969b7710489.png)

    Thay thế giá trị `“com.honeything”` của `applicationId` thành `env.get("ANDROID_APP_ID")`
    Thay thế giá trị `1` của `versionCode` thành `Integer.valueOf(env.get("ANDROID_APP_VERSION_CODE"))`
    Thay thế giá trị `“1.0”` của `versionName` thành `env.get("ANDROID_APP_VERSION_NAME")`
    Thêm dòng sau vào cuối của object defaultConfig
    `resValue "string", "build_config_package", "<<packageName>>”`
    (Chú ý là <<packageName>> sẽ tìm ở trong android/app/src/main/AndroidManifest.xml )
    ![16](https://user-images.githubusercontent.com/30967592/102459099-c0829000-4077-11eb-8d0f-bfdd17b94579.png)

-   Sau tất cả, chúng ta có:
    ![17](https://user-images.githubusercontent.com/30967592/102459100-c11b2680-4077-11eb-8b7e-96a42e02aaf3.png)

-   Tìm đến android.signingConfig, thêm đoạn sau vào ngay dưới object debug

        ```
        release {
        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
        }
        ```

    ![18](https://user-images.githubusercontent.com/30967592/102459103-c1b3bd00-4077-11eb-9954-88900bc747b4.png)

-   Bên dưới android.buildTypes, copy đoạn sau vào:

        ```
        flavorDimensions "enviroment"
        productFlavors {
        dev {
        dimension "enviroment"
        resValue "string", "app_name", project.env.get("APP_NAME")
        signingConfig signingConfigs.debug
        }
        staging {
        dimension "enviroment"
        resValue "string", "app_name", project.env.get("APP_NAME")
        signingConfig signingConfigs.debug
        }
        product {
        dimension "enviroment"
        resValue "string", "app_name", project.env.get("APP_NAME")
        signingConfig signingConfigs.release
        }
        }
        ```

    ![19](https://user-images.githubusercontent.com/30967592/102459104-c24c5380-4077-11eb-907b-5aa9848c9e38.png)

-   Vào file `android/app/src/main/res/values/strings.xml` để xóa hết các thẻ <string/> đi, chỉ để lại mỗi <resource/> để tránh bị duplicate project name
