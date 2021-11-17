import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/Login';
import { CreateAccount } from '../pages/CreateAccount';
import { TestArea } from '../pages/TestArea';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  TestArea: undefined;
};

export const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <stackRoutes.Screen name="TestArea" component={TestArea} />
    <stackRoutes.Screen name="Login" component={Login} />
    <stackRoutes.Screen name="CreateAccount" component={CreateAccount} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
