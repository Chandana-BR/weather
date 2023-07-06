// import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlashScreen from './src/screens/FlashScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen component={HomeScreen} name="Home" />
          <Stack.Screen
            name="Forecast"
            options={{animation: 'fade_from_bottom'}}
            component={ForecastScreen}
          />
          <Stack.Screen component={FlashScreen} name="Flash" />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
