import React, { useRef, useCallback } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import logo from '../../assets/logo.png';

import {
  Container,
  Text,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback((data: object) => {
    console.log(data);
  }, []);

  const click = () => {
    console.log('Clicado');
  };

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flexGrow: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} style={{ marginTop: 50 }} />
            <View>
              <Text>Autentique-se</Text>
            </View>

            <Form
              style={{ flex: 1, width: '100%' }}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button onPress={click}>Entrar</Button>

              <ForgotPassword>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
              </ForgotPassword>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export { SignIn };
