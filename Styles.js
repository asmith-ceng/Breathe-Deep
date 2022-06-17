import * as React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { screensEnabled } from 'react-native-screens';
import WavyBackground from "react-native-wavy-background";


export const LIGHT = '#EDF2F3';
export const DARK = '#1F3541';
export const ACSNT1 = '#AFD8F2';
export const ACSNT = '#5289B5';
//const FONT;
export const CIRCLE_SIZE = 220;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
      fontSize: 50,
      paddingTop: 100,
      fontFamily: 'Verdana-Bold',
    },

    Line: {
      marginTop: 160,
      backgroundColor: LIGHT,
      width: 200,
      height: 4,
      zIndex: 2,
      position: 'absolute',
      alignSelf: 'center',
      borderRadius: 2,
    },

    TitleTextStyle: {
      color: ACSNT,
      fontSize: 50,
      fontFamily: 'Verdana-Bold',
    },

    TitleViewStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    

    ButtonViewStyle: {
      flex: 1.4,
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


  IntervalProgressText: {
    color: LIGHT,
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    marginBottom: 5,
  },

  SkipButtonStyle: {
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
    marginBottom: 10,
  },

  IntervalContainer: {
    flex: 1,
    flexDirection: 'row',
    //flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent:'center',
  },

  IntervalItemRight: {
    width: '50%',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: LIGHT,
  },

  IntervalItemLeft: {
    width: '50%',
    alignItems: 'flex-end',
    borderWidth: 2,
    borderColor: LIGHT,
  },

  IntervalTextStyle: {
    color: LIGHT,
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    margin: 2,
  },

  TableTitleTextStyle: {
    color: ACSNT1,
    fontSize: 20,
    fontFamily: 'Verdana-Bold',
    marginBottom: 10,
    marginTop: 10,
  },

  RowTextStyle: {
    color: DARK
  },

  DropDownStyle: {
    backgroundColor: DARK
  },

  SelectedRowStyle: {
    backgroundColor: LIGHT
  },

  SelectedRowTextStyle: {
    color: DARK
  },

  PlaceHolder: {
    backgroundColor: DARK,
    flex: 1.2,
    alignItems: 'center',
  },

    CO2PracticeScreenStyle: {
      width: '100%',
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
      fontSize: 18,
      fontFamily: 'Verdana-Bold'
    },

    PracticeTimeTextStyle: {
      color: LIGHT,
      fontSize: 25,
      fontFamily: 'Verdana-Bold'
    },

    TextColor: {
      color: '#b0e0e6'
    },

    // Table list styles

    TableScreenView: {
      flex: 1,
      backgroundColor: DARK,
    },


    TableItemView: {
      marginTop: 5,
      paddingLeft: 5,
      width: windowWidth,
      justifyContent: 'center',
      height: 50,
      backgroundColor: DARK,
      borderRadius: 10,
      borderColor: LIGHT,
      borderWidth: 2,
    },

    TableTitle: {
      marginLeft: 5,
      color: LIGHT,
      fontSize: 15,
      fontFamily: 'Verdana-Bold'
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
      color: LIGHT,
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
        backgroundColor: LIGHT
    },

    TimerView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: DARK
    },
  
    ScreenStyle: {
      flex: 1,
      backgroundColor: '#00004d'
    },

    CenterView: {
      flex: 1,
      backgroundColor: DARK,
    },

    SetHoldView: {
      flex: 1,
      backgroundColor: DARK,
      alignItems: 'center'
    }
});

export const waves = (
  <View style={{
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }}>
  <View
        style={{
          zIndex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={20}
            frequency={1}
            offset={200}
            color={ACSNT1}
            bottom
          />
      </View>
      <View
        style={{
          zIndex: 2,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={20}
            frequency={2}
            offset={150}
            color={ACSNT}
            bottom
          />
      </View>
      <View
        style={{
          zIndex: 3,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
          <WavyBackground
            height={300}
            width={1100}
            amplitude={30}
            frequency={1}
            offset={75}
            color={DARK}
            bottom
          />
      </View>
      </View>
);