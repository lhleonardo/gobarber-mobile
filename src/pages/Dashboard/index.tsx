import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import noAvatar from '../../assets/no-avatar.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  Avatar,
  Title,
  ProvidersList,
  Provider,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderDays,
  ProviderHours,
  ScheduleText,
} from './styles';

export interface IProvider {
  id: string;
  name: string;
  avatarURL: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const [providers, setProviders] = useState<IProvider[]>([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#28262e"
        translucent
      />
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={() => signOut()}>
          <Avatar
            source={user.avatarURL ? { uri: user.avatarURL } : noAvatar}
          />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<Title>Cabeleireiros</Title>}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Provider>
            <ProviderAvatar
              source={item.avatarURL ? { uri: item.avatarURL } : noAvatar}
            />
            <ProviderInfo>
              <ProviderName>{item.name}</ProviderName>
              <ProviderDays>
                <Icon
                  style={{ marginRight: 8 }}
                  name="calendar"
                  size={20}
                  color="#FF9000"
                />
                <ScheduleText>Segunda à sexta</ScheduleText>
              </ProviderDays>
              <ProviderHours>
                <Icon
                  style={{ marginRight: 8 }}
                  name="clock"
                  size={20}
                  color="#FF9000"
                />
                <ScheduleText>08h às 18h</ScheduleText>
              </ProviderHours>
            </ProviderInfo>
          </Provider>
        )}
      />
    </Container>
  );
};

export { Dashboard };
