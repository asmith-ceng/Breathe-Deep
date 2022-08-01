import * as React from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles, waves } from './Styles';
import { setCurrHold, getCurrHold } from './StorageManager';
import moment from 'moment'

class TestTimer extends React.Component {
    state = {
        currHold: '00',
        timer: null,
        minutes: '00',
        seconds: '00',
        timerRunning: false,
        testFinished: false,
        buttonTitle: "Start Test",
    }
  
    constructor(props) {
      super(props);
  
      this.onButtonStart = this.onButtonStart.bind(this);
      this.onButtonStop = this.onButtonStop.bind(this);
      this.start = this.start.bind(this);
      getCurrHold().then(result => this.setState({currHold: result}))
    }
  
    componentDidMount() {

    }
  
  
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
  
  
  
    start() {
        var self = this;
        let timer = setInterval(() => {
            var sec = (Number(this.state.seconds) + 1).toString(),
              min = this.state.minutes;
  
            if (Number(this.state.seconds) == 59) {
              min = (Number(this.state.minutes) + 1).toString();
              sec = '00';
            }
  
            self.setState({
                minutes: min.length == 1 ? '0'+min : min,
                seconds: sec.length == 1 ? '0'+sec : sec,
            });
        }, 1000);
        this.setState({timer});
    }
  
    onButtonStart = () => {
      if (this.state.testFinished) {
        this.setState({    
            timer: null,
            minutes: '00',
            seconds: '00',
            timerRunning: false,
            testFinished: false,
            buttonTitle: "Start Test",
        });
      } else if (this.state.timerRunning) {
        this.onButtonStop();
      } else {
        this.start();
        this.state.buttonTitle = "Stop Test";
        this.setState({timerRunning: true});
      }
    }
  
  
    onButtonStop = () => {
      clearInterval(this.state.timer);
      this.setState({timerRunning: false, buttonTitle: 'Test Again', testFinished: true});
    }

    onSetButton = () => {
        let currHold = this.state.minutes+':'+this.state.seconds;
        setCurrHold(currHold).then(this.forceUpdate());
        this.setState({currHold: currHold});
        this.onButtonStart();
    }

    renderHoldSetButton() {
        return(
          //<View style={styles.SetHoldView}>
            <TouchableOpacity
            style = {[styles.HomeButtonStyle, {marginTop: 20}]}
            onPress = {this.onSetButton}
            >
            <Text style={styles.HomeButtonTextStyle}>set {this.state.minutes}:{this.state.seconds} as current best</Text>
            </TouchableOpacity>
          //</View>
        );
    }
  
    render() {
      getCurrHold();
      var setButton;
      if (this.state.testFinished) {
        setButton = this.renderHoldSetButton();
      }
      return(
        <View style={styles.CenterView}>
          {waves}
          <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.HomeButtonTextStyle}>your current best is: {this.state.currHold}</Text>
          </View>
          <View style={styles.TimerView}>
              <Text style={styles.TimerText}>{this.state.minutes}:{this.state.seconds}</Text>

              <TouchableOpacity
                  style = {styles.HomeButtonStyle}
                  onPress={this.onButtonStart}
              >
                  <Text style={styles.HomeButtonTextStyle}>{this.state.buttonTitle}</Text>
              </TouchableOpacity>
              {setButton}
          </View>
        </View>
      );
    }
}

export function TestScreen() {
  return (
    <View style={styles.ScreenStyle}>
      <TestTimer/>
    </View>
  );
}