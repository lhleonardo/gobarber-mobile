import React, { useCallback } from 'react';

import { Image } from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';
import { Container, Title, Information } from './styles';

import confirmation from '../../assets/confirmation.png';
import { Button } from '../../components/Button';

const AccountCreated: React.FC = () => {
  const navigation = useNavigation();

  const handlePressOk = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
      }),
    );
  }, [navigation]);
  return (
    <Container>
      <Image source={confirmation} width={80} height={80} />
      <Title>Seu cadastro foi concluído</Title>
      <Information>Agora você já pode entrar no app</Information>

      <Button style={{ width: '100%' }} onPress={handlePressOk}>
        Entrar no app
      </Button>
    </Container>
  );
};

export { AccountCreated };
