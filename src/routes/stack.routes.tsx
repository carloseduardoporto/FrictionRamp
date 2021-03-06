import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/Login';
import { CreateAccount } from '../pages/CreateAccount';
import { TestArea } from '../pages/TestArea';
import { SamplesList } from '../pages/SamplesList';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  TestArea: undefined;
  SamplesList: { userId: string | undefined };
};

export const stackRoutes = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <stackRoutes.Screen name="Login" component={Login} />
    <stackRoutes.Screen name="CreateAccount" component={CreateAccount} />
    <stackRoutes.Screen name="TestArea" component={TestArea} />
    <stackRoutes.Screen name="SamplesList" component={SamplesList} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
