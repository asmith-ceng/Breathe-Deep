import * as React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    TextColor: {
      color: '#b0e0e6'
    },

    PracticeTimerStyle: {
      alignSelf: 'center',
    },
  
    ButtonStyle: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      backgroundColor: '#b0e0e6',
      alignSelf: 'center',
    },

    SetHoldButtonStyle: {
        marginTop: 'auto',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: '#b0e0e6',
        alignSelf: 'center',
      },
  
    VolumeButton: {
      marginTop: 10,
      paddingRight: 10,
      alignSelf: 'flex-end',
      position: 'absolute',
    },
  
    ButtonText: {
      color: '#00004d',
      fontSize: 20,
      fontFamily: 'Verdana-Bold'
    },
  
    TimerText: {
      color: '#b0e0e6',
      fontSize: 50,
      fontFamily: 'Verdana-Bold',
      alignSelf: 'center',
    },

    TopBar: {
        flex: 1,
        backgroundColor: '#00004d',
    },

    SetButtonView: {
        flex: 1.5,
        backgroundColor: '#00004d'
    },

    TimerView: {
        flex: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#00004d'
    },
  
    ScreenStyle: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#00004d'
    },

    CenterView: {
      flex: 1,
      backgroundColor: '#b0e0e6',
    },
  });