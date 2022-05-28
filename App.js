import * as React from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import IosFonts from './IosFonts';
import { TestScreen } from './Test';
import { styles } from './Styles';
import { PracticeScreen } from './Practice';
import * as SecureStore from 'expo-secure-store';

checkValue();

async function checkValue() {
  let result = await SecureStore.getItemAsync('curr-hold');
  if (!result) {
    await SecureStore.setItemAsync('curr-hold', '0');
  }
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.ScreenStyle}>
      <Text style={styles.TextColor}>Home Screen</Text>

      <TouchableOpacity
        style = {styles.ButtonStyle}
        onPress={() => navigation.navigate('Test')}
      >
        <Text style={styles.ButtonText}>Go to Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.ButtonStyle}
        onPress={() => navigation.navigate('Practice')}
      >
        <Text style={styles.ButtonText}>Go to Practice</Text>
      </TouchableOpacity>

      {/* <IosFonts/> */}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
