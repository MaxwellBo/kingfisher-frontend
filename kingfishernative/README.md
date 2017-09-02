# Kingfisher

## Native App
The app has now been ejected from  `create-react-native-app`. To get it running:
- in `/kingfishernative/`, run `npm install`
- `yarn`
- `cd ios`
- `pod install`
- `cd ..`
###iOS
- Install xcode
- `react-native run-ios`
###Android
- Install Android Studio
- Tools > Android > AVD Manager
- Create Virtual Device
- Choose an SDK >= 6.0.0
- Finish
- You may have to install gradle and an android sdk, but Android Studio should prompt you
- `react-native run-android`