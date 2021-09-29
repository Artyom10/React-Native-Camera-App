import React, {LegacyRef} from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

interface PropTypes {
  setCamera: LegacyRef<RNCamera>;
  flash: boolean;
}

export const ReactNativeCameraComponent: React.FC<PropTypes> = ({
  setCamera,
  flash,
}) => {
  return (
    <RNCamera
      ref={setCamera}
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={
        flash
          ? RNCamera.Constants.FlashMode.torch
          : RNCamera.Constants.FlashMode.off
      }
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
