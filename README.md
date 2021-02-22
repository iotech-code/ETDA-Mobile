# ETDA-Mobile
### How to build
- $ npm install
- $ react-native link react-native-picker
- $ npx pod-install
- Edit file `node_modules/react-native-picker/android/build.gradle`
- $ cd android && ./gradlew assembleRelease
- $ npx jetify
```
android {
    compileSdkVersion 29
    buildToolsVersion "23.0.1"

    defaultConfig {
        minSdkVersion 22
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"

    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

# การติดตั้ง
    - ลบโฟลเดอร์ node_modules 
    - ลบข้อมูลในโฟลเอร์ ios/Pods/
    - ลบไฟล์ Podfile.lock
    # คำสั่งหลังจากลบไฟล์
    - npm install
    - react-native link
    - cd ios && pod install && cd ..
    - react-native run-ios  หรือ react-native run-android

### วิธีแก้เมื่อรันแอปแล้วเป็นรุ่นเก่า
```
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

npx react-native run-android
```

### วิธีแก้เปิดโหมด Debug ไม่ได้ บน android
```
cd android && ./gradlew clean && cd ..
react-native start --reset-cache

# Open new terminal at same folder.
react-native run-android
```

# update วันที่ 9/02/2021
    ให้ npm install ใหม่ แล้ว react-native link และ pod install ใหม่ด้วยนะครับ
