# Getting Started

## Installing JS and React/React-Native dependencies
1. Make sure react, react-native and the react-native-cli are installed
2. Run ```npm install```
3. Run ```react-native link```

## Building the project on Android
1. Install Android Studio
2. Open the Android project (/android directory) in Android Studio
3. If Android Studio prompts you to upgrade Gradle say yes
4. In your console navigate to ```~/Library/Android/sdk/tools/``` and launch the Android SDK Manager by typing ```./android```
5. Make sure that all of the SDK Build Tools are installed for API Revisions 22.x and 23.x
![SDK Manager 1](readme-images/sdkmanager_1.jpg)
6. Make sure that the SDK Platform and the Google APIs are installed for API Revisions 22 and 23
![SDK Manager 2](readme-images/sdkmanager_2.jpg)
7. Build the project either using Android Studio or another IDE such as Deco

## Running the project in an Android emulator
1. Install Genymotion
2. Install an image in Genymotion that uses API 22 (i.e: Google Nexus 5 - 5.1.0 - API 22)
3. Configure Genymotion to use the Android SDK tools by pointing it to your SDK directory (normally ```~/Library/Android/sdk```). This configuration will allow IDEs to see your emulated device using adb
![SDK Manager 2](readme-images/genymotion_1.jpg)
4. Run the image you just installed in Genymotion
5. Build and run the project in your IDE. The application should automatically launch inside your emulated device
6. The following screen may pop-up up when the app launches. You need to Permit drawing over so that the react application launches successfully
![SDK Manager 2](readme-images/drawover.jpg)

## Using CodePush

- List current CodePush deployments: ```code-push deployment ls rewardwings-ios```
- List current CodePush deployments with keys: ```code-push deployment ls rewardwings-ios -k```
- Deploy update to Staging: ```code-push release-react rewardwings-ios ios --description "Description of the update"```
- Deploy a mandatory update to Staging: ```code-push release-react rewardwings-ios ios --description "Description of the update" --mandatory```
- Promote Staging deplyment to Production: ```code-push promote rewardwings-ios Staging Production```
- More CodePush CLI info: https://github.com/Microsoft/code-push/tree/master/cli#promoting-updates
- More CodePush React Native module info: https://github.com/Microsoft/react-native-code-push