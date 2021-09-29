import React from 'react';
import {Button} from 'react-native';

interface PropTypes {
  title: string;
  onPressFunction: () => void;
}

export const CustomButton: React.FC<PropTypes> = ({title, onPressFunction}) => {
  return <Button title={title} onPress={onPressFunction} color={'blue'} />;
};
