import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../pages/Login';

export const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <stackRoutes.Screen name="Login" component={Login} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
