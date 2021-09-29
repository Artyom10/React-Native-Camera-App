import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, PermissionsAndroid, Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {ReactNativeCameraComponent} from './components/cameraRN';
import {Menu} from './components/menu/menu';
import {RNCamera, TakePictureResponse} from 'react-native-camera';

const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

const savePicture = async (tag: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  CameraRoll.save(tag);
};

export const Screen: React.FC = () => {
  const [reactNativeCamera, setReactNativeCamera] = useState<RNCamera>(null);
  const [flashMode, setFlashMode] = useState<boolean>(false);
  const [showMode, setShowMode] = useState<boolean>(false);

  const [previewImgUri, setPreviewImgUri] = useState<string>(null);
  const [imageUri, setImageUri] = useState<string>(null);

  const getPreview = useCallback(async () => {
    try {
      const response = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      });

      setImageUri(response.edges[0].node.image.uri);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    setShowMode(true);

    if (reactNativeCamera) {
      try {
        const values = {quality: 1, base64: true, pauseAfterCapture: true};
        const data: TakePictureResponse =
          await reactNativeCamera.takePictureAsync(values);

        setPreviewImgUri(data.uri);
      } catch (err) {
        console.log(err);
      }
    }
  }, [reactNativeCamera]);

  const retakePhoto = useCallback(() => {
    setPreviewImgUri(null);
    setShowMode(false);

    reactNativeCamera.resumePreview();
  }, [reactNativeCamera]);

  const confirmPhoto = useCallback(async () => {
    setImageUri(previewImgUri);
    try {
      await savePicture(previewImgUri);
    } catch (err) {
      console.log(err);
    }
    reactNativeCamera.resumePreview();
    setShowMode(false);
  }, [reactNativeCamera, previewImgUri]);

  const changeFlashMode = useCallback(() => setFlashMode(prev => !prev), []);

  useEffect(() => {
    getPreview();
  }, [getPreview]);

  return (
    <View style={styles.container}>
      <ReactNativeCameraComponent
        flash={flashMode}
        setCamera={setReactNativeCamera}
      />
      <Menu
        takePhoto={takePhoto}
        showMode={showMode}
        imageUri={imageUri}
        retakePhoto={retakePhoto}
        confirmPhoto={confirmPhoto}
        changeFlashMode={changeFlashMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
