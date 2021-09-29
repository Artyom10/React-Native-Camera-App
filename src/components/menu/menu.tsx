import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ConfirmMenu} from './confirmMenu';
import {PreviewMenu} from './previewMenu';

interface PropTypes {
  imageUri: string;
  takePhoto: () => Promise<void>;
  showMode: boolean;
  confirmPhoto: () => Promise<void>;
  changeFlashMode: () => void;
  retakePhoto: () => void;
}

export const Menu: React.FC<PropTypes> = ({
  imageUri,
  takePhoto,
  showMode,
  confirmPhoto,
  changeFlashMode,
  retakePhoto,
}) => {
  return (
    <View style={styles.menu}>
      {!showMode ? (
        <PreviewMenu
          imageUri={imageUri}
          takePhoto={takePhoto}
          changeFlashMode={changeFlashMode}
        />
      ) : (
        <ConfirmMenu retakePhoto={retakePhoto} confirmPhoto={confirmPhoto} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
});
