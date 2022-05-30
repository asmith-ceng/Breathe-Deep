import * as React from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import IosFonts from './IosFonts';
import { TestScreen } from './Test';
import { styles, LIGHT, DARK } from './Styles';
import { PracticeScreen } from './Practice';
import * as SecureStore from 'expo-secure-store';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

checkValue();

async function checkValue() {
  let result = await SecureStore.getItemAsync('curr-hold');
  if (!result) {
    await SecureStore.setItemAsync('curr-hold', '0');
  }
}

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
          onPress={() => navigation.navigate('Practice')}
        >
          <Text style={styles.HomeButtonTextStyle}>C02 practice</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Circle}>
        <CountdownCircleTimer
          size={220}
          isPlaying={false}
          duration={20}
          trailColor={'#2a246e'}
          initialRemainingTime={14}
          colors={['#b2aded', '#b2aded']}
          colorsTime={[7, 5, 2, 0]}
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
        <Stack.Screen name="Practice" component={PracticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
