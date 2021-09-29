import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {CustomButton} from '../common/customButton';

interface PropTypes {
  imageUri: string;
  takePhoto: () => Promise<void>;
  changeFlashMode: () => void;
}

export const PreviewMenu: React.FC<PropTypes> = ({
  imageUri,
  takePhoto,
  changeFlashMode,
}) => {
  return (
    <>
      <CustomButton title="flash" onPressFunction={changeFlashMode} />
      <CustomButton title="Take photo" onPressFunction={takePhoto} />
      <Image borderRadius={50} source={{uri: imageUri}} style={styles.image} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});
