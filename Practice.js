import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity } from 'react-native';
import { LIGHT, styles } from './Styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as SecureStore from 'expo-secure-store';

// medium decrement of rest time (6.25 percent of PB less each interval)
const mediumDecrease = [0.5, 0.4375, 0.375, 0.3125, 0.25, 0.1875, 0.125, 0.0625];
const numIntervals = 8;
const baseIntervals = [15, 15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2]

async function getTestTimes() {
  let currHold = await SecureStore.getItemAsync('curr-hold');
  let minutes = currHold.substring(0, 2);
  let seconds = currHold.substring(3, 5);
  seconds = parseInt(seconds);
  // total seconds of the current hold
  seconds += 60 * parseInt(minutes);
  
  if (seconds < 30) {
    alert("here");
    return baseIntervals;
  } else {
    let intervals = []
    for (let i = 0; i < numIntervals; i++) {
      intervals.push(Math.round(seconds * 0.5));
      intervals.push(Math.round(seconds * mediumDecrease[i]));
    }
    return intervals;
  }
}

class PracticeTimer extends React.Component {


  state = {
    buttonText: "start",
    isPlaying: false,
    isHold: true,
    timerDurations: [10],
    durationIndex: 0,
    key: 0,
    trail: 'black',
    color: LIGHT,
    message: 'hold for',
  }

  constructor(props) {
    super(props);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onTimerComplete = this.onTimerComplete.bind(this);
    //this.onButtonPause = this.onButtonPause.bind(this);
    getTestTimes().then(result => this.setState({timerDurations: result}));
  }

  componentDidMount() {
  }


  componentWillUnmount() {
  }

  onButtonPress = () => {
    if (this.state.isPlaying == false) {
      this.onButtonStart();
    } else {
      this.onButtonPause();
    }
  }

  onButtonStart = () => {
    this.setState({isPlaying: true});
    this.setState({buttonText: "pause"});
  }

  onButtonPause = () => {
    this.setState({isPlaying: false});
    this.setState({buttonText: "start"});
  }

  onTimerComplete = () => {
    if (this.state.durationIndex == this.state.timerDurations.length -1 ) {
      this.setState({message: 'session complete!'})
      return;
    }
    if (this.state.isHold == true) {
      this.setState({message: 'relax for'})
      this.setState({durationIndex: this.state.durationIndex + 1});
      this.setState({isHold: !this.state.isHold});
      this.setState({key: this.state.key + 1});
      //return { shouldRepeat: true, duration: this.state.timerDurations[this.state.durationIndex]}
    } else {
      this.setState({message: 'hold for'})
      this.setState({durationIndex: this.state.durationIndex + 1});
      this.setState({isHold: !this.state.isHold});
      this.setState({key: this.state.key + 1});
      //return { shouldRepeat: true, duration: this.state.timerDurations[this.state.durationIndex]}
    }
  }

  

  render() {
    return(
    <View style={styles.CO2PracticeScreenStyle}>
      <View style={styles.Circle}>
      <CountdownCircleTimer
        key={this.state.key}
        isPlaying={this.state.isPlaying}
        duration={this.state.timerDurations[this.state.durationIndex]}
        initialRemainingTime={this.state.timerDurations[this.state.durationIndex]}
        colors={LIGHT}
        size={220}
        trailColor={'black'}
        //colorsTime={[7, 5, 2, 0]}
        onComplete={this.onTimerComplete}
      >
        {({ remainingTime }) => 
          <View style={styles.CenterItems}>
            <Text style={styles.PracticeTimerTextStyle}>{this.state.message}</Text>
            <Text style={styles.PracticeTimerTextStyle}>{getTimeText(remainingTime)}</Text>
          </View>
        }
      </CountdownCircleTimer>
      </View>
      <View style={styles.PlaceHolder}></View>
      <View style={styles.CO2PracticeScreenStyle}>
      <TouchableOpacity
        style = {styles.HomeButtonStyle}
        onPress={this.onButtonPress}
      >
        <Text style={styles.HomeButtonTextStyle}>{this.state.buttonText}</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
  }
}

function getTimeText(time) {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  let timeString = "" + minutes + ":" + seconds;
  if (timeString.length == 4) {
    timeString = "0" + timeString;
  }
  return timeString;
}


export function CO2PracticeScreen() {
    return (
      <View style={styles.CO2PracticeScreenStyle}>
        <PracticeTimer/>
      </View>
    );
  }