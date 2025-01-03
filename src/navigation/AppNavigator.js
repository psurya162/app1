import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import PolicyList from '../screens/PolicyList';
import CreateLead from '../screens/CreateLead';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen name="PolicyList" component={PolicyList} />
      <Stack.Screen name="CreateLead" component={CreateLead} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
