import React, { useEffect, useState } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import logo from '../../assets/logo.png';

import { Container, Text, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const [fitMode, setFitMode] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setFitMode(true));
    Keyboard.addListener('keyboardDidHide', () => setFitMode(false));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />
            <View>
              <Text>Crie sua conta</Text>
            </View>
            <Input name="email" icon="user" placeholder="Nome completo" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => console.log('Clicado')}>Entrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!fitMode && (
        <BackToSignIn onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={12} color="#f4ede8" />
          <BackToSignInText>Voltar para login</BackToSignInText>
        </BackToSignIn>
      )}
    </>
  );
};

export { SignUp };
