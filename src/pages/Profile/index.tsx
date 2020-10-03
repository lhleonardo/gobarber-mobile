import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';
import {
  Alert,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import extractValidationMessage from '../../utils/extractValidationMessage';
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
import api from '../../services/api';

const schema = Yup.object({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Precisa ser e-mail válido')
    .required('E-mail obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', {
    is: '',
    then: Yup.string(),
    otherwise: Yup.string()
      .required('Nova senha é obrigatória')
      .min(6, 'Senha precisa ter 6 caracteres'),
  }),
  confirmPassword: Yup.string()
    .when('oldPassword', {
      is: '',
      then: Yup.string(),
      otherwise: Yup.string().required(
        'Confirmação da nova senha é obrigatória',
      ),
    })
    .oneOf([Yup.ref('password'), undefined], 'As senhas não coincidem'),
});

interface IProfileFormData {
  name: string;
  email: string;

  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [updatingImage, setUpdatingImage] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);

  const { goBack } = useNavigation();

  const { user, signOut, updateProfile } = useAuth();

  const handleChangeAvatar = useCallback(() => {
    setUpdatingImage(true);
    ImagePicker.showImagePicker(
      {
        title: 'Escolha uma foto',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Tirar uma foto',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        if (response.didCancel) {
          setUpdatingImage(false);
          return;
        }

        if (response.error) {
          setUpdatingImage(false);
          Alert.alert(
            'Falha ao modificar a foto',
            'Algo de errado aconteceu ao tentar escolher a foto.',
          );
        }

        // foto foi escolhida
        const formData = new FormData();

        formData.append('avatar', {
          type: 'image/jpeg',
          uri: response.uri,
          name: `${user.id}.jpeg`,
        });

        api
          .patch('/users/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(apiResponse => {
            updateProfile(apiResponse.data);
            setUpdatingImage(false);
          })
          .catch(() => {
            Alert.alert(
              'Falha na atualização',
              'Um erro aconteceu ao salvar a sua nova imagem. Tente mais tarde.',
            );
            setUpdatingImage(false);
          });
      },
    );
  }, [user.id, updateProfile]);

  const handleSubmit = useCallback(
    async (data: IProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        await schema.validate(data, { abortEarly: false });

        const formData: IProfileFormData = {
          name: data.name,
          email: data.email,
          ...(data.oldPassword
            ? {
                oldPassword: data.oldPassword,
                password: data.password,
                confirmPassword: data.confirmPassword,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateProfile(response.data);
        goBack();

        Alert.alert('Tudo certo!', 'Seus dados foram atualizados com sucesso.');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = extractValidationMessage(error);
          formRef.current?.setErrors(errors);
        } else {
          Alert.alert(
            'Falha ao atualizar!',
            'Algo de errado aconteceu. Tente novamente mais tarde.',
          );
        }
      }
    },
    [updateProfile, goBack],
  );

  const handleSignOutRequest = useCallback(() => {
    Alert.alert(
      'Desconectar',
      'Você quer realmente desconectar da sua conta?',
      [
        { text: 'Quero sair', style: 'default', onPress: () => signOut() },
        { text: 'Continuar conectado', style: 'cancel' },
      ],
    );
  }, [signOut]);

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flexGrow: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
      >
        <Container>
          <Header>
            <BackButton onPress={() => goBack()}>
              <Icon color="#999591" size={22} name="arrow-left" />
            </BackButton>

            <HeaderText>Meu perfil</HeaderText>

            <LogoutButton onPress={handleSignOutRequest}>
              <Icon color="#999591" size={22} name="power" />
            </LogoutButton>
          </Header>

          <Content>
            <ImageContainer>
              <UserAvatar
                source={user.avatarURL ? { uri: user.avatarURL } : noAvatar}
              />
              <ChangeAvatarButton onPress={handleChangeAvatar}>
                {updatingImage ? (
                  <ActivityIndicator size={22} color="#312E38" />
                ) : (
                  <Icon name="camera" size={22} color="#312E38" />
                )}
              </ChangeAvatarButton>
            </ImageContainer>
            <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
              <Input
                ref={nameInputRef}
                name="name"
                placeholder="Nome completo"
                icon="user"
                autoCapitalize="words"
                autoCorrect
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                name="email"
                placeholder="Endereço de e-mail"
                icon="mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Separator />
              <Input
                ref={oldPasswordInputRef}
                name="oldPassword"
                placeholder="Senha atual"
                icon="lock"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                secureTextEntry
                ref={passwordInputRef}
                name="password"
                placeholder="Nova senha"
                icon="lock"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                name="confirmPassword"
                secureTextEntry
                placeholder="Confirmação de senha"
                icon="lock"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
