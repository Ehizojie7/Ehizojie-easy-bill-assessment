import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/services/store'
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </Provider>
  );
}

