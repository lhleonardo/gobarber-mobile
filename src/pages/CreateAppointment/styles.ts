import { FlatList, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { IProvider, IAvailability } from './index';

interface IProviderItemProps {
  selected?: boolean;
}

interface ISessionItemProps {
  selected: boolean;
}

interface ISessionItemTextProps {
  selected: boolean;
}

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

export const BackButton = styled.TouchableOpacity`
  width: auto;
  height: auto;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #f4e3e8;
  font-family: 'RobotoSlab-Medium';
`;

export const UserAvatar = styled.Image`
  width: 48px;
  height: 48px;

  border-radius: 24px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  margin-left: 24px;
  margin-top: 32px;
`;

export const ProviderItem = styled(RectButton)<IProviderItemProps>`
  height: 48px;
  background: ${props => (props.selected ? '#FF9000' : '#3e3b47')};

  border-radius: 10px;

  margin-right: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 12px 8px;
`;

export const ProviderAvatar = styled.Image`
  width: 38px;
  height: 38px;

  border-radius: 19px;
`;

export const ProviderName = styled.Text<IProviderItemProps>`
  margin-left: 8px;
  font-size: 14px;
  color: ${props => (props.selected ? '#232129' : '#f4e3e8')};
  font-family: 'RobotoSlab-Medium';
`;

export const Calendar = styled.View`
  margin-top: 40px;
`;

export const CalendarTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4e3e8;
  font-size: 25px;

  padding: 0 24px;
`;

export const SelectDateButtonContainer = styled.View`
  margin: 0 24px;
  padding-top: 10px;
`;

export const SelectDateButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  margin-top: 8px;
  font-size: 14px;

  text-align: right;
`;

export const Workhours = styled.View`
  margin: 40px 24px 16px;
`;

export const WorkhoursTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4e3e8;
  font-size: 25px;
`;

export const Period = styled.View`
  margin-top: 24px;
`;

export const PeriodTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #999591;
  font-size: 16px;
`;

export const Sessions = styled(FlatList as new () => FlatList<IAvailability>)`
  margin-top: 12px;
`;

export const SessionItem = styled(RectButton)<ISessionItemProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;

  margin-right: 8px;
`;

export const SessionItemTitle = styled.Text<ISessionItemTextProps>`
  font-family: 'RobotoSlab-Medium';
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 14px;
`;

export const NoSessions = styled.View`
  margin-top: 12px;
  flex-direction: row;
  align-items: center;
`;

export const NoSessionsText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #999591;
  font-size: 14px;

  margin-left: 8px;
`;

export const Confirmation = styled.View`
  margin: 0 24px 24px;
`;

export const Loading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
