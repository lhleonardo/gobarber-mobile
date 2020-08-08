import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button style={{ marginTop: 30 }} onPress={() => signOut()}>
        Desconectar
      </Button>
    </SafeAreaView>
  );
};

export { Dashboard };
