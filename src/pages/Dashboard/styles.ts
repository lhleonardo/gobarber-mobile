import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

import { FlatList } from 'react-native';

import { IProvider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 12}px 24px 16px;
  background: #28262e;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  color: #f4ede8;
`;

export const Username = styled.Text`
  color: #ff9000;
`;

export const ProfileButton = styled(RectButton)``;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;

  border-radius: 28px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;

  margin-bottom: 24px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  margin-top: 32px;
  padding: 0 24px;
`;

export const Provider = styled(RectButton)`
  width: 100%;
  background: #3e3b47;
  border-radius: 10px;

  flex-direction: row;

  padding: 20px 16px;

  margin-bottom: 16px;
`;

export const ProviderAvatar = styled.Image`
  width: 82px;
  height: 82px;

  border-radius: 41px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderDays = styled.View`
  margin-top: 12px;

  align-items: center;
  justify-content: flex-start;

  flex-direction: row;
`;

export const ProviderHours = styled.View`
  margin-top: 8px;

  align-items: center;
  justify-content: flex-start;

  flex-direction: row;
`;

export const ScheduleText = styled.Text`
  font-family: 'RobotoSlab-Normal';
  font-size: 12px;
  color: #999591;
`;
