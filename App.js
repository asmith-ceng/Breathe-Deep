import * as React from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import IosFonts from './IosFonts';
import { TestScreen } from './Test';
import { styles, LIGHT, DARK, ACSNT, ACSNT1 } from './Styles';
import { CO2PracticeScreen } from './Practice';
import * as SecureStore from 'expo-secure-store';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

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
          <Text style={styles.HomeButtonTextStyle}>test hold</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.HomeButtonStyle}
          onPress={() => navigation.navigate('CO2Practice')}
        >
          <Text style={styles.HomeButtonTextStyle}>C02 practice</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.HomeButtonStyle}
          onPress={() => navigation.navigate('O2Practice')}
        >
          <Text style={styles.HomeButtonTextStyle}>02 practice</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Line}></View>
      <View style={styles.Circle}>
        <CountdownCircleTimer
          size={220}
          isPlaying={false}
          duration={10}
          trailColor={trail}
          colors={[color, color]}
          colorsTime={[30, 0]}
          //onComplete={switchTimerColors()}
        >
      </CountdownCircleTimer>
      </View>
      {/* <IosFonts/> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: DARK,
            }
          }}
          />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen
          name="CO2Practice" 
          component={CO2PracticeScreen}
          options={{
            headerStyle: {
              backgroundColor: DARK,
            }
          }}
           />
        <Stack.Screen name="O2Practice" component={CO2PracticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
