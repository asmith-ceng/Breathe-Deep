import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as SecureStore from 'expo-secure-store';

async function getTestTimes() {
  let currHold = await SecureStore.getItemAsync('curr-hold');
  return [1, 2, 3, 4, 5]
}

class PracticeTimer extends React.Component {


  state = {
    isPlaying: false,
    isHold: true,
    timerDurations: [10],
    durationIndex: 0,
    key: 0
  }

  constructor(props) {
    super(props);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onTimerComplete = this.onTimerComplete.bind(this);
    //this.onButtonPause = this.onButtonPause.bind(this);
    getTestTimes().then(result => this.setState({timerDurations: result}))
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
  }

  onButtonPause = () => {
    this.setState({isPlaying: false});
  }

  onTimerComplete = () => {
    if (this.state.durationIndex == this.state.timerDurations.length -1 ) {
      return;
    }
    if (this.state.isHold == true) {
      this.setState({durationIndex: this.state.durationIndex + 1});
      this.setState({isHold: !this.state.isHold});
      this.setState({key: this.state.key + 1});
      //return { shouldRepeat: true, duration: this.state.timerDurations[this.state.durationIndex]}
    } else {
      this.setState({durationIndex: this.state.durationIndex + 1});
      this.setState({isHold: !this.state.isHold});
      this.setState({key: this.state.key + 1});
      //return { shouldRepeat: true, duration: this.state.timerDurations[this.state.durationIndex]}
    }
  }

  render() {
    return(
    <View style={styles.ScreenStyle}>
      <CountdownCircleTimer
        style={styles.PracticeTimerStyle}
        key={this.state.key}
        isPlaying={this.state.isPlaying}
        duration={this.state.timerDurations[this.state.durationIndex]}
        initialRemainingTime={this.state.timerDurations[this.state.durationIndex]}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={this.onTimerComplete}
      >
        {({ remainingTime }) => <Text style={styles.TextColor}>{remainingTime}</Text>}
      </CountdownCircleTimer>
      <TouchableOpacity
        style = {styles.ButtonStyle}
        onPress={this.onButtonPress}
      >
        <Text style={styles.ButtonText}>start test</Text>
      </TouchableOpacity>
     </View>
    );
  }
}

export function PracticeScreen() {
    return (
      <View style={styles.ScreenStyle}>
        <Text style={styles.TextColor}>Practice Screen</Text>
        <PracticeTimer/>
      </View>
    );
  }