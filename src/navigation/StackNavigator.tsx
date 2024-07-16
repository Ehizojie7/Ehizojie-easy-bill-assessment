import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddEditTodoScreen from '../screens/AddEditTodoScreen';
import HomeScreen from '../screens/HomeScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  AddEditTodo: { id?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
    <Stack.Screen name="Details" component={TodoDetailsScreen} options={{headerShown: false}} />
    <Stack.Screen name="AddEditTodo" component={AddEditTodoScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
);

export default StackNavigator;
