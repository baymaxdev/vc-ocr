# Virtual Control Assessment Project


## Getting Started

Clone repository
```
git clone https://github.com/baymaxdev/vc-ocr.git
```

### Prerequisites

What things you need to install the software and how to install them

```
node > 12.17
npm > 6.14.4
XCode > 11.3
```

### Installing

- Installing dependencies

```
npm install
```
- Installing pods (for iOS)

```
sudo gem install cocoapods
npx pod-install
```

- Running app on simulators

```
npm run ios
npm run android
```

## User Stories

1. As a user, I want to easily add an image to the mobile app by capturing a new photo through the app or selecting the photo from the device gallery.
2. As a user, I want to view all photos added to the app, in descending order by time uploaded/updated. (think: “Photos” view in Google Photos or Apple Photos)
3. As a user, I should be able to click on a photo to view it in full, and see the extracted text strings listed (by string/word, not by character - eg. ‘Hello’, ‘world’ NOT ‘H’, ‘e’, ‘l’, ‘l’, ‘o’, etc), as well as the corresponding bounding box of each text string displayed on the image itself. Note: make sure to consider readability/usability here given close proximity of multiple text strings.
4. As a user, I should be able to select a single text string/bounding box, and have the option to manually edit the text.
5. As a user, if I’ve manually edited a text string, I should be able to view the original text (display could be toggled, like a tooltip or collapsable section).
6. As a user, if the text string was manually edited or manually added, I should be able to visually differentiate it from the OCR auto-extracted text strings (differentiated using color or some other visual indicator).
7. BONUS: As a user, if the automatic OCR missed a text string, I should be able to add a new bounding box to the image and manually input the text string.
8. BONUS: I should be able to remove/delete images from the app, ideally multiple at a time.

## Used Techs

- Used [Firebase ML Kit](https://rnfirebase.io/ml-vision/text-recognition) which is same as [Google ML Kit](https://developers.google.com/ml-kit/vision/text-recognition)

- Integrated redux, [redux-persist](https://github.com/rt2zz/redux-persist) with AnsycStorage to store images and texts.

## Answers to the questions

- **What is the process to deploy/release the mobile app to the Google Play or Apple Store?**

  * [Android Deploy Guide](https://reactnative.dev/docs/signed-apk-android)
  * [iOS Deploy Guide](https://reactnative.dev/docs/next/publishing-to-app-store/)
  
- **How would you manage back-end synchronization/versioning in response to Android or iOS updates?**

  I've implemented redux with [redux-thunk](https://github.com/reduxjs/redux-thunk) middleware which is good structure for backend API integration.
  
  I can add new redux actions and reducers for new functionalities.