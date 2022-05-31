import * as React from 'react';
import { StyleSheet } from 'react-native';
import { screensEnabled } from 'react-native-screens';

export const LIGHT = '#EDF2F3';
export const DARK = '#1F3541';
export const ACSNT1 = '#AFD8F2';
export const ACSNT = '#5289B5';
//const FONT;
export const CIRCLE_SIZE = 220;

export const styles = StyleSheet.create({
  // HOME SCREEN --------

    HomeButtonStyle: {
      shadowColor: 'black',
      shadowOffset: { height: 3, width: 3 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 5, //IOS
      paddingVertical: 12,
      width: 200,
      borderRadius: 10,
      borderColor: LIGHT,
      borderWidth: 2,
      backgroundColor: DARK,
      alignSelf: 'center',
      margin: 5,
      alignItems: 'center',
    },

    Circle: {
      paddingTop: 25,
      width: 300,
      height: 300,

      //backgroundColor: LIGHT,
      zIndex: 1,
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
    },

    HomeButtonTextStyle: {
      color: LIGHT,
      fontSize: 20,
      fontFamily: 'Verdana-Bold'
    },

    OtherTitleTextStyle: {
      color: ACSNT1,
      fontSize: 30,
      paddingTop: 100,
      fontFamily: 'Verdana-Bold',
    },

    Line: {
      marginTop: 136,
      backgroundColor: LIGHT,
      width: 100,
      height: 4,
      zIndex: 2,
      position: 'absolute',
      alignSelf: 'center',
      borderRadius: 2,
    },

    TitleTextStyle: {
      color: ACSNT,
      fontSize: 30,
      transform: [
        {scaleY: 1},
        {scaleX: 1}
      ],
      
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

    CenterItems: {
      alignItems: 'center',
    },

    HomeScreenStyle: {
      flex: 1,
      backgroundColor: DARK
    },

    HomeTextStyle: {
      color: LIGHT
    },

  // CO2Practice Screen

  PlaceHolder: {
    backgroundColor: DARK,
    flex: 1.5,
    alignItems: 'center',
  },

    CO2PracticeScreenStyle: {
      backgroundColor: DARK,
      flex: 2,
      alignItems: 'center',
    },

    CO2PracticeTimerView: {
      paddingTop: 25,
      width: 300,
      height: 300,
      zIndex: 1,
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
    },

    PracticeTimerTextStyle: {
      color: LIGHT,
      fontSize: 20,
      fontFamily: 'Verdana-Bold'
    },

    TextColor: {
      color: '#b0e0e6'
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