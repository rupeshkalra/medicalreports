import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';
import Report from './screens/Report';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ presentation: 'modal' }}initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: 'All Reports',
            headerTitleStyle: {
              textAlign: 'center',
              color: '#00b7c2',
            },
          }}></Stack.Screen>
 
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: ''
          }}></Stack.Screen>

        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: 'Your Report',
            headerTitleStyle: {
              textAlign: 'center',
              color: '#00b7c2',
            },
        }}></Stack.Screen>

        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: '#0f4c75',
            },
            title: '',
            headerTitleStyle: {
              textAlign: 'center',
              color: '#00b7c2',
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
     // { <View style={{padding: 10}}>
      // <TextInput
      //   style={{height: 40}}
      //   placeholder="Type here to translate!" 
        // onChangeText={text => setText(text)}
        // defaultValue={text}
      // />
    // </View>
  );
};
export default App;

