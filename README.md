# React Native Activity Feed Example

A mobile application built using React Native, [Stream.io](https://getstream.io/) and [react-native-activity-feed](https://github.com/GetStream/react-native-activity-feed)

![screenshots of example app](/images/screenshots@2x.png)

## Features

- Flat feed
- Notification feed
- Activity detail screen
- Profile screen
- Profile update screen
- Likes & Comments
- Status update with hashtags, mentions, URL enrichment and image upload

## Requirements

- NodeJS
- Expo

## Setup instructions

### 1. Install dependencies

```sh
# Clone the example app repo
git clone https://github.com/GetStream/react-native-example
cd react-native-example

# Install npm dependencies
yarn;
```

### 2. Setup up your app

Get your Stream API credentials from the [user dashboard](https://getstream.io/dashboard/) and make sure your application has these feed groups:

- user (type Flat)
- timeline (type Flat)
- notification (type Notification)

If you followed the [React Native tutorial](https://getstream.io/react-native-activity-feed/tutorial/), you already have a pre-configured app on your account that you can use for this project.

```
mv .env.example .env
```

Open the `.env` file in your favorite editor. And fill in the credentials.

### 3. Get your userToken and setup demo data

```
yarn run init-data
```

Copy the line this script outputs and put it in your `.env` file.

### 4. Start your app

```
npm start
```

Follow the instructions from the terminal to preview the app on your phone or using an emulator.
