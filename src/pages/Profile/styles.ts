import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Form as UForm } from '@unform/mobile';
import { RectButton } from 'react-native-gesture-handler';

const statusBarHeight =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight();

export const Container = styled.View`
  flex-grow: 1;
`;

export const Header = styled.View`
  margin: ${statusBarHeight + 40}px 24px 0;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: auto;
  height: auto;
`;

export const HeaderText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: auto;
  height: auto;
`;

export const Content = styled.View`
  flex: 1;

  align-items: center;
`;

export const ImageContainer = styled.View`
  margin: 30px 0;
  position: relative;

  align-items: center;
  justify-content: center;
`;

export const UserAvatar = styled.Image`
  width: 180px;
  height: 180px;

  border-radius: 90px;
`;

export const ChangeAvatarButton = styled(RectButton)`
  width: 50px;
  height: 50px;
  border-radius: 25px;

  background: #ff9000;

  align-items: center;
  justify-content: center;

  position: absolute;

  bottom: 0;
  right: 0;
`;

export const Form = styled(UForm)`
  margin: 0 24px;
`;

export const Separator = styled.View`
  height: 32px;
`;
