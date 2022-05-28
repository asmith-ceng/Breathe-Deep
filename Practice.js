import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles'

export function PracticeScreen() {
    return (
      <View style={styles.ScreenStyle}>
        <Text style={styles.TextColor}>Practice Screen</Text>
      </View>
    );
  }