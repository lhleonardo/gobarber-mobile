import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator, Alert, Platform, ScrollView } from 'react-native';

import DatePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth';
import noAvatar from '../../assets/no-avatar.png';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersList,
  ProviderItem,
  ProviderAvatar,
  ProviderName,
  Calendar,
  CalendarTitle,
  SelectDateButtonContainer,
  SelectDateButtonText,
  Workhours,
  WorkhoursTitle,
  Period,
  PeriodTitle,
  Sessions,
  SessionItem,
  SessionItemTitle,
  NoSessions,
  NoSessionsText,
  Confirmation,
  Loading,
} from './styles';
import api from '../../services/api';
import { Button } from '../../components/Button';

interface IRouteProps {
  providerId: string;
}

export interface IProvider {
  id: string;
  name: string;
  avatarURL: string;
}

export interface IAvailability {
  hour: number;
  available: boolean;

  formattedHour: string;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const { goBack, reset } = useNavigation();

  const route = useRoute();
  const routeParams = route.params as IRouteProps;

  const [providers, setProviders] = useState<IProvider[]>([]);

  const [selectedProvider, setSelectedProvider] = useState<string>(
    routeParams.providerId,
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const [availability, setAvailability] = useState<IAvailability[]>([]);

  const [datePickerOpened, setDatePickerOpened] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleToggleDatePickerOpen = useCallback(
    () => setDatePickerOpened(currentValue => !currentValue),
    [],
  );

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get<IProvider[]>('/providers');

      const selected = response.data.find(
        provider => provider.id === routeParams.providerId,
      );

      // coloca sempre o provider selecionado como primeiro a aparecer na
      // tela
      if (!selected) {
        setProviders(response.data);
      } else {
        const values = response.data.filter(
          provider => provider.id !== routeParams.providerId,
        );

        setProviders([selected, ...values]);
      }
    }

    loadProviders();
  }, [routeParams.providerId]);

  useEffect(() => {
    async function loadAvailabilityForDate() {
      const response = await api.get(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            day: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          },
        },
      );

      setAvailability(response.data);
    }

    loadAvailabilityForDate();
  }, [selectedDate, selectedProvider]);

  const selectedDateFormatted = useMemo(() => {
    const formattedDate = format(selectedDate, "dd'/'MM'/'yyyy", {
      locale: ptBR,
    });

    return formattedDate;
  }, [selectedDate]);

  const morningAvailability = useMemo(() => {
    const hours = availability
      .filter(session => session.available && session.hour <= 12)
      .map(session => {
        const hour = session.hour.toString().padStart(2, '0');

        return {
          ...session,
          formattedHour: `${hour}:00`,
        };
      });
    return hours;
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    const hours = availability
      .filter(session => session.available && session.hour > 12)
      .map(session => {
        const hour = session.hour.toString().padStart(2, '0');

        return {
          ...session,
          formattedHour: `${hour}:00`,
        };
      });
    return hours;
  }, [availability]);

  const handleSelectProvider = useCallback(
    (providerId: string) => setSelectedProvider(providerId),
    [],
  );

  const handleSelectDate = useCallback(
    (_: unknown, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        handleToggleDatePickerOpen();
      }

      if (date) {
        setSelectedDate(date);
        setSelectedHour(null);
      }
    },
    [handleToggleDatePickerOpen],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      setLoading(true);
      if (!selectedHour) {
        Alert.alert(
          'Calma lá!',
          'Selecione o horário que você deseja marcar o agendamento',
        );
        return;
      }

      const date = selectedDate;
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        providerId: selectedProvider,
        date,
      });

      reset({
        index: 1,
        routes: [
          { name: 'Dashboard' },
          {
            name: 'AppointmentCreated',
            params: {
              date: date.getTime(),
              provider: providers.find(
                provider => provider.id === selectedProvider,
              )?.name,
            },
          },
        ],
      });
    } catch {
      Alert.alert(
        'Não deu certo :(',
        'Não foi possível criar o agendamento. Tente novamente mais tarde.',
      );
    } finally {
      setLoading(false);
    }
  }, [selectedHour, selectedDate, selectedProvider, reset, providers]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Agendamento</HeaderTitle>
        <UserAvatar
          source={user.avatarURL ? { uri: user.avatarURL } : noAvatar}
        />
      </Header>

      <ScrollView>
        <ProvidersList
          data={providers}
          horizontal
          keyExtractor={provider => provider.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: provider }) => (
            <ProviderItem
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar
                source={
                  provider.avatarURL ? { uri: provider.avatarURL } : noAvatar
                }
              />

              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderItem>
          )}
        />

        <Calendar>
          <CalendarTitle>Escolha uma data</CalendarTitle>

          <SelectDateButtonContainer>
            <Button onPress={handleToggleDatePickerOpen}>
              Selecionar outra data
            </Button>
            <SelectDateButtonText>
              Data selecionada:
              {` ${selectedDateFormatted}`}
            </SelectDateButtonText>
          </SelectDateButtonContainer>

          {datePickerOpened && (
            <DatePicker
              mode="date"
              value={selectedDate}
              display="calendar"
              onChange={handleSelectDate}
              minimumDate={new Date()}
            />
          )}
        </Calendar>

        <Workhours>
          <WorkhoursTitle>Escolha um horário</WorkhoursTitle>

          <Period>
            <PeriodTitle>Manhã</PeriodTitle>
            {morningAvailability.length === 0 && (
              <NoSessions>
                <Icon name="frown" color="#ff9000" size={18} />
                <NoSessionsText>Não há horários disponíveis</NoSessionsText>
              </NoSessions>
            )}
            <Sessions
              data={morningAvailability}
              horizontal
              keyExtractor={session => session.formattedHour}
              renderItem={({ item: session }) => (
                <SessionItem
                  onPress={() => handleSelectHour(session.hour)}
                  selected={selectedHour === session.hour}
                >
                  <SessionItemTitle selected={selectedHour === session.hour}>
                    {session.formattedHour}
                  </SessionItemTitle>
                </SessionItem>
              )}
            />
          </Period>
          <Period>
            <PeriodTitle>Tarde</PeriodTitle>

            {afternoonAvailability.length === 0 && (
              <NoSessions>
                <Icon name="frown" color="#ff9000" size={18} />
                <NoSessionsText>Não há horários disponíveis</NoSessionsText>
              </NoSessions>
            )}
            <Sessions
              data={afternoonAvailability}
              horizontal
              keyExtractor={session => session.formattedHour}
              renderItem={({ item: session }) => (
                <SessionItem
                  onPress={() => handleSelectHour(session.hour)}
                  selected={selectedHour === session.hour}
                >
                  <SessionItemTitle selected={selectedHour === session.hour}>
                    {session.formattedHour}
                  </SessionItemTitle>
                </SessionItem>
              )}
            />
          </Period>
        </Workhours>

        <Confirmation>
          <Button onPress={handleCreateAppointment}>
            {loading ? (
              <Loading>
                <ActivityIndicator size={20} color="#3e3b47" />
              </Loading>
            ) : (
              'Agendar'
            )}
          </Button>
        </Confirmation>
      </ScrollView>
    </Container>
  );
};

export default CreateAppointment;
