import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import { Foundation } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator 
  screenOptions={{
    tabBarActiveBackgroundColor: 'black', 
  tabBarActiveTintColor: '#FFCA44',
  tabBarIcon: () => <Foundation name="clipboard-notes" size={24} color="#FFCA44" />
  }}>
    <Tab.Screen name="To-Do List" 
    component={StackNavigator} />
  </Tab.Navigator>
);

export default TabNavigator;
