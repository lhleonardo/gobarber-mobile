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
      <Title>Cadastramento concluído</Title>
      <Information>Agora é só autenticar-se</Information>

      <Button onPress={handlePressOk}>OK</Button>
    </Container>
  );
};

export { AccountCreated };
