import React from 'react';
import {CustomButton} from '../common/customButton';

interface PropTypes {
  retakePhoto: () => void;
  confirmPhoto: () => Promise<void>;
}

export const ConfirmMenu: React.FC<PropTypes> = ({
  retakePhoto,
  confirmPhoto,
}) => {
  return (
    <>
      <CustomButton title="Save" onPressFunction={confirmPhoto} />
      <CustomButton title="Retake" onPressFunction={retakePhoto} />
    </>
  );
};
