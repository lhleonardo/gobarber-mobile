import React, { useRef, useEffect, useCallback } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import extractValidationMessage from '../../utils/extractValidationMessage';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import logo from '../../assets/logo.png';

import {
  Container,
  Text,
  Separator,
  BackToSignIn,
  BackToSignInText,
} from './styles';

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required(
    'Senha obrigatória com grande mensagem de erro',
  ),

  confirmPassword: Yup.string()
    .required('A confirmação da senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
});

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // registra o movimento de scroll quando o teclado é aberto em um campo
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () =>
      scrollViewRef.current?.scrollToEnd({ animated: true }),
    );
  }, []);

  const onSubmitForm = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, { abortEarly: false });
        await api.post('/users', data);

        navigation.reset({
          index: 0,
          routes: [{ name: 'AccountCreated' }],
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = extractValidationMessage(err);
          formRef.current?.setErrors(errors);
        } else {
          Alert.alert('Erro no cadastro', 'Algo de errado aconteceu');
        }
      }
    },
    [navigation],
  );
  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flexGrow: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          ref={scrollViewRef}
        >
          <Container>
            <Image source={logo} style={{ marginTop: 50 }} />
            <View>
              <Text>Crie sua conta</Text>
            </View>
            <Form
              ref={formRef}
              onSubmit={onSubmitForm}
              style={{ width: '100%' }}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome completo"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Separator />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="confirmPassword"
                icon="lock"
                placeholder="Confirme sua senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={12} color="#f4ede8" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export { SignUp };
