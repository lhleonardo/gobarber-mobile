import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

import { AppContext } from './hooks';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <AppContext>
        <View style={{ backgroundColor: '#312e38', flex: 1 }}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </View>
      </AppContext>
    </>
  );
};

export { App };
