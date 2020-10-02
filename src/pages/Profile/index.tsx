import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderText,
  LogoutButton,
  Content,
  ImageContainer,
  UserAvatar,
  ChangeAvatarButton,
  Form,
  Separator,
} from './styles';

import noAvatar from '../../assets/no-avatar.png';
import { Button } from '../../components/Button';

const Profile: React.FC = () => {
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const { user, signOut } = useAuth();

  const handleSubmit = useCallback(data => {}, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon color="#999591" size={22} name="arrow-left" />
        </BackButton>

        <HeaderText>Meu perfil</HeaderText>

        <LogoutButton onPress={() => signOut()}>
          <Icon color="#999591" size={22} name="power" />
        </LogoutButton>
      </Header>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
        <Content>
          <ImageContainer>
            <UserAvatar
              source={user.avatarURL ? { uri: user.avatarURL } : noAvatar}
            />
            <ChangeAvatarButton>
              <Icon name="camera" size={22} color="#312E38" />
            </ChangeAvatarButton>
          </ImageContainer>
          <Form
            initialData={{ name: user.name, email: user.email }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Input name="name" placeholder="Nome completo" icon="user" />
            <Input name="email" placeholder="Endereço de e-mail" icon="mail" />

            <Separator />
            <Input name="password" placeholder="Senha atual" icon="lock" />
            <Input name="newPassword" placeholder="Nova senha" icon="lock" />
            <Input
              name="confirmPassword"
              placeholder="Confirmação de senha"
              icon="lock"
            />

            <Button onPress={() => formRef.current?.submitForm}>
              Confirmar mudanças
            </Button>
          </Form>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Profile;
