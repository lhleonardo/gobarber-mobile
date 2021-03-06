import styled from 'styled-components/native';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0px 40px ${Platform.OS === 'android' ? 60 : 50}px;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin: 48px 0 16px;
`;

export const Separator = styled.View`
  height: 20px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  background: #312e38;

  border-top-width: 1px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const BackToSignInText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  font-size: 12px;
  margin-left: 8px;
`;
