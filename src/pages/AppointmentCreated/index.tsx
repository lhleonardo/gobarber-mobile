import React, { useCallback, useEffect, useState } from 'react';

import { Image } from 'react-native';

import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Container, Title, Information } from './styles';

import confirmation from '../../assets/confirmation.png';
import { Button } from '../../components/Button';

interface IRouteParams {
  date: number;
  provider: string;
}

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const routeParams = route.params as IRouteParams;

  const date = new Date(routeParams.date);

  const formattedDate = format(date, "EEEE', dia 'dd' de 'MMMM' às 'HH:mm'h'", {
    locale: ptBR,
  });

  const { provider } = routeParams;

  const handlePressOk = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Dashboard' }],
      }),
    );
  }, [navigation]);
  return (
    <Container>
      <Image
        source={confirmation}
        width={80}
        height={80}
        style={{ marginBottom: 20 }}
      />
      <Title>Agendamento Concluído</Title>
      <Information>{`${formattedDate} com ${provider}`}</Information>

      <Button style={{ width: '80%' }} onPress={handlePressOk}>
        OK
      </Button>
    </Container>
  );
};

export { AppointmentCreated };
