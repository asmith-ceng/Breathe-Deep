import * as React from 'react';
import { Button, View, Text, StyleSheet, Timer, Stopwatch, AppRegistry, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './Styles';
import { setCurrHold, getCurrHold } from './StorageManager'

class TestTimer extends React.Component {
    state = {
        currHold: '00',
        timer: null,
        minutes: '00',
        seconds: '00',
        miliseconds: '0',
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
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.seconds,
                min = this.state.minutes;
  
            if (Number(this.state.miliseconds) == 99 ) {
                count = (Number(this.state.seconds) + 1).toString();
                num = '00';
            }
  
            if (Number(this.state.seconds) == 60 ) {
              min = (Number(this.state.minutes) + 1).toString();
              count = '00';
            }
  
            self.setState({
                minutes: min,
                seconds: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        this.setState({timer});
    }
  
    onButtonStart = () => {
      if (this.state.testFinished) {
        this.setState({    
            timer: null,
            minutes: '00',
            seconds: '00',
            miliseconds: '00',
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
        let currHold = this.state.minutes+':'+this.state.seconds+'.'+this.state.miliseconds.charAt(0);
        setCurrHold(currHold).then(this.forceUpdate());
        this.setState({currHold: currHold});
        this.onButtonStart();
    }

    renderHoldSetButton() {
        return(
            <TouchableOpacity
            style = {styles.SetHoldButtonStyle}
            onPress = {this.onSetButton}
            >
            <Text style={styles.ButtonText}>set {this.state.minutes}:{this.state.seconds}.{this.state.miliseconds.charAt(0)} as current hold</Text>
            </TouchableOpacity>
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
            <View style={styles.TopBar}>
                <TouchableOpacity
                    style = {styles.VolumeButton}
                >
                    <Icon
                    name='volume-2'
                    color='#b0e0e6'
                    size={50}
                    />
                </TouchableOpacity>
                <Text style={styles.TextColor}>{this.state.currHold}</Text>
            </View>
            <View style={styles.SetButtonView}>
              {setButton}
            </View>
            <View style={styles.TimerView}>
                <Text style={styles.TimerText}>{this.state.minutes}:{this.state.seconds}.{this.state.miliseconds.charAt(0)}</Text>

                <TouchableOpacity
                    style = {styles.ButtonStyle}
                    onPress={this.onButtonStart}
                >
                    <Text style={styles.ButtonText}>{this.state.buttonTitle}</Text>
                </TouchableOpacity>
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