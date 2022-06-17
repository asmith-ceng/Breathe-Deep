import * as React from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import IosFonts from './IosFonts';
import { TestScreen } from './Test';
import { styles, LIGHT, DARK, ACSNT, ACSNT1, waves } from './Styles';
import { PracticeScreen } from './Practice';
import * as SecureStore from 'expo-secure-store';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Tables } from './Tables';



checkValue();

async function checkValue() {
  let result = await SecureStore.getItemAsync('curr-hold');
  if (!result) {
    await SecureStore.setItemAsync('curr-hold', '0');
  }
}

let trail = 'black';
let color = LIGHT;

// function switchTimerColors() {
//   alert("here");
//   let lastTrail = trail;
//   let lastColor = color;
//   color = lastTrail;
//   trail = lastColor;
//   return { shouldRepeat: true };
// }

function HomeScreen({ navigation }) {
  return (
    <View style={styles.HomeScreenStyle}>
      {waves}
      {/* <Text style={styles.HomeTextStyle}>Home Screen</Text> */}
      <View style={styles.TitleViewStyle}>
        <Text style={styles.OtherTitleTextStyle}>BREATHE</Text>
        <Text style={styles.TitleTextStyle}>DEEP</Text>
      </View>
      <View style={styles.ButtonViewStyle}>
        <TouchableOpacity
          style = {styles.HomeButtonStyle}
          onPress={() => navigation.navigate('Test')}
        >
          <Text style={styles.HomeButtonTextStyle}>Test hold</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.HomeButtonStyle}
          onPress={() => navigation.navigate('Train')}
        >
          <Text style={styles.HomeButtonTextStyle}>Train</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.HomeButtonStyle}
          onPress={() => navigation.navigate('EditTables')}
        >
          <Text style={styles.HomeButtonTextStyle}>Edit tables</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Line}></View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{animation: 'fade'}}
      >
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: DARK,
            }
          }}
        />
        <Stack.Screen 
          name="Test"
          component={TestScreen}
          options={{
            title: 'test hold',
            headerStyle: {
              backgroundColor: DARK,
            },
            headerTitleStyle: {
              color: LIGHT,
              fontFamily: 'Verdana-Bold'
            }
          }}
        />
        <Stack.Screen
          name="Train" 
          component={PracticeScreen}
          options={{
            headerStyle: {
              backgroundColor: DARK,
            }
          }}
        />

        <Stack.Screen name="EditTables" component={Tables} />
      </Stack.Navigator>

      
    </NavigationContainer>
  );
}

export default App;
