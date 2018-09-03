// @flow

import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CoverImage from './CoverImage';
import { Avatar, UploadImage } from 'expo-activity-feed';
import FormField from './FormField';
import { StreamApp } from 'expo-activity-feed';
import type { UserData, StreamAppCtx } from '../types';

type Props = {|
  registerSave: (saveFunc: () => any) => void,
|};

export default function EditProfileForm(props: Props) {
  return (
    <StreamApp.Consumer>
      {(appCtx) => <EditProfileFormInner {...props} {...appCtx} />}
    </StreamApp.Consumer>
  );
}

type PropsInner = {| ...Props, ...StreamAppCtx |};

type State = UserData;

class EditProfileFormInner extends React.Component<PropsInner, State> {
  constructor(props: PropsInner) {
    super(props);
    this.state = { ...props.user.data };
  }

  componentDidMount() {
    this.props.registerSave(async () => {
      await this.props.user.update(this.state);
      this.props.changedUserData();
    });
  }

  _onUploadButtonPress() {
    console.log('onUploadButtonPress');
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <CoverImage source={this.state.coverImage} size={150} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingRight: 15,
            paddingLeft: 15,
            height: 200,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 100 + '%',
            }}
          >
            <Avatar
              source={this.state.profileImage}
              size={100}
              editButton
              onUploadButtonPress={this._onUploadButtonPress}
            />
            <UploadImage onUploadButtonPress={this._onUploadButtonPress} />
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <FormField
            value={this.state.name}
            label={'Name'}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <FormField
            value={this.state.url}
            label={'Website'}
            onChangeText={(text) => this.setState({ url: text })}
          />
          <FormField
            value={this.state.desc}
            label={'Description'}
            onChangeText={(text) => this.setState({ desc: text })}
            multiline
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
