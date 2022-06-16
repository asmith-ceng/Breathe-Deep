import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList, AppRegistry, TouchableOpacity, Vibration } from 'react-native';
import { LIGHT, styles } from './Styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as SecureStore from 'expo-secure-store';

// update these to scale with longest hold time
// generate perms by reading tables from secure storage
var TABLES = [
  {
    id: 1,
    title: 'CO2 table',
    intervals: [15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0]
  },

  {
    id: 2,
    title: 'O2 table',
    intervals: [15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0]
  },

  {
    id: 3,
    title: 'create new +'
  }
]

const Item = ({ item }) => (
    <View style={styles.TableItemView}>
        <Text style={styles.TableTitle}>{item.title}</Text>
    </View>
  );
  

export function Tables() {
    const renderItem = ({ item }) => {
        return (
        <Item
            item={item}
        />
        );
    };

    return (
        <View style={styles.TableScreenView}>
        <FlatList
            data={TABLES}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
        </View>
    );
  }

