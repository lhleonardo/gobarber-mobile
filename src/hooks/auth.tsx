/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface IUserData {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

interface AuthContextData {
  user: IUserData;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;

  updateProfile(user: IUserData): void;
}

interface AuthState {
  token: string;
  user: IUserData;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  // armazena o informativo de carregamento do AsyncStorage
  const [loading, setLoading] = useState(true);

  // faz a leitura dos dados que estão salvos no storage do dispositivo
  // com o usuário autenticado, realizando verificação da validade do token salvo
  useEffect(() => {
    async function loadCredentials() {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber/token',
        '@GoBarber/user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadCredentials();
  }, []);

  // método de autenticação do usuário
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', { email, password });

    const { user, token } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber/token', token],
      ['@GoBarber/user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  // método de logout para o usuário conectado
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber/token', '@GoBarber/user']);

    setData({} as AuthState);
  }, []);

  // atualiza os dados do usuário autenticado e os persiste para próxima leitura
  // do storage do dispositivo
  const updateProfile = useCallback(
    async (user: IUserData) => {
      setData({ user, token: data.token });

      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }

  return context;
}
