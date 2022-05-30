import * as React from 'react';
import { StyleSheet } from 'react-native';
import { screensEnabled } from 'react-native-screens';

export const LIGHT = '#b2aded';
export const DARK = '#2a246e';
export const ACSNT = '#f75454';
//const FONT;
export const CIRCLE_SIZE = 220;

export const styles = StyleSheet.create({
  // HOME SCREEN --------

    HomeButtonStyle: {
      shadowColor: 'rgba(0,0,0, .4)',
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 5, //IOS
      paddingVertical: 12,
      width: 200,
      borderRadius: 10,
      backgroundColor: LIGHT,
      alignSelf: 'center',
      margin: 5,
      alignItems: 'center',
    },

    Circle: {
      paddingTop: 43,
      width: 300,
      height: 300,

      //backgroundColor: LIGHT,
      zIndex: 1,
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
    },

    HomeButtonTextStyle: {
      color: DARK,
      fontSize: 20,
      fontFamily: 'Verdana-Bold'
    },

    OtherTitleTextStyle: {
      color: ACSNT,
      fontSize: 50,
      paddingTop: 40,
      fontFamily: 'Verdana-Bold',
      //alignSelf: 'stretch',
    },

    TitleTextStyle: {
      color: LIGHT,
      fontSize: 50,
      transform: [
        {scaleY: 3},
        {scaleX: 1}
      ],
      paddingTop: 7,
      fontFamily: 'Verdana-Bold',
      //alignSelf: 'stretch',
    },

    TitleViewStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      zIndex: 2,
    },

    ButtonViewStyle: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: DARK
    },

    HomeScreenStyle: {
      flex: 1,
      backgroundColor: DARK
    },

    HomeTextStyle: {
      color: LIGHT
    },






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
        alignItems: 'flex-end'
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
      backgroundColor: '#00004d'
    },

    CenterView: {
      flex: 1,
      backgroundColor: '#00004d',
    },
  });