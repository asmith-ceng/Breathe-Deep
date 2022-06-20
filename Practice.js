import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, Vibration, FlatList } from 'react-native';
import { LIGHT, styles, DARK, ACSNT, ACSNT1, waves } from './Styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { getTable as getTableFromSM, getSelectedId, getUsedIds, setSelectedId } from './StorageManager';
import SelectDropdown from 'react-native-select-dropdown';
import * as Speech from 'expo-speech';
import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

// medium decrement of rest time (6.25 percent of PB less each interval)
// const mediumDecrease = [0.5, 0.4375, 0.375, 0.3125, 0.25, 0.1875, 0.125, 0.0625];
// const numIntervals = 8;
// const baseIntervals = [15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0]
let table = {
  id: null, title: null, intervals: null
}

let intervalsForList = [];

let tableList = [];
let selectedId = 0;

async function setAudioSettings() {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });
}

async function getTables() {
  tableList = [];
  // get current selected id, dont just use 0
  let usedIds = await getUsedIds();
  selectedId = await getSelectedId();


  for (let i = 0; i < usedIds.length; i++) {
    table = await getTableFromSM(usedIds[i]);
    tableList.push(table);
  }

  //console.log(JSON.stringify(tableList));

  let index = getTableIndex();
  return index;
}

function getTableIndex() {
  console.log(selectedId);
  for (let i = 0; i < tableList.length; i++) {
    if (tableList[i].id == selectedId) {
      return i;
    }
  }
}

let first = false;
let second = false;
let third = false;

class PracticeTimer extends React.Component {


  state = {
    buttonText: "start",
    isPlaying: false,
    isHold: false,
    tableIndex: 0,
    timerDurations: [10],
    durationIndex: 0,
    key: 0,
    trail: 'black',
    color: LIGHT,
    message: 'breathe for',
    defaultSelectionText: 'Select a table',
    tableTitle: 'no table selected',
  }

  constructor(props) {
    super(props);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onTimerComplete = this.onTimerComplete.bind(this);
    getTables().then(result => this.asyncSetup(result));
  }

  asyncSetup(index) {
    table = tableList[index];
    this.setState({
      tableIndex: index,
      buttonText: "start",
      isPlaying: false,
      isHold: false,
      durationIndex: 0,
      key: this.state.key + 1,
      message: 'breathe for',
      tableTitle: table.title,
    });
    
    this.setState({timerDurations: table.intervals});
    console.log("intervals state set to " + JSON.stringify(table.intervals));
    intervalsForList = [];
    for (let i = 0; i < table.intervals.length - 1; i++) {
      let interval = {
        id: i,
        time: table.intervals[i],
        type: i % 2 == 0 ? 'breathe for ' : 'hold for ',
      }
      intervalsForList.push(interval);
    }
    this.forceUpdate();
  }

  componentDidMount() {
    setAudioSettings().then(console.log('audio settings set'));
  }


  componentWillUnmount() {
  }

  onSkipPress = () => {
    if (this.state.durationIndex >= this.state.timerDurations.length - 1) {
      return;
    }
    this.onTimerComplete();
  }

  onButtonPress = () => {
    if (this.state.durationIndex >= this.state.timerDurations.length - 1) {
      return;
    }
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
    third = false;
    second = false;
    first = false;
    Vibration.vibrate(1000);
    let speech = '';
    if (this.state.durationIndex == this.state.timerDurations.length - 2) {
      speech = 'session complete, well done';
    } else if (this.state.isHold) {
      speech = 'breathe';
    } else {
      speech = 'hold breath';
    }
    //Speech.getAvailableVoicesAsync().then(result => console.log(result));
    Speech.speak(
      speech,
      {
        voice: 'com.apple.ttsbundle.siri_Aaron_en-US_compact' // modularize this so it uses owners siri voice?
      });
    if (this.state.durationIndex == this.state.timerDurations.length - 2) {
      this.setState({message: 'session complete!'})
      this.setState({durationIndex: this.state.durationIndex + 1});
      return { shouldRepeat: false };
    }
    if (this.state.isHold == true) {
      this.setState({message: 'breathe for'})
      this.setState({durationIndex: this.state.durationIndex + 1});
      this.setState({isHold: !this.state.isHold});
      this.setState({key: this.state.key + 1});
    } else {
      this.setState({message: 'hold for'})
      this.setState({durationIndex: this.state.durationIndex + 1});
      this.setState({isHold: !this.state.isHold});
      this.setState({key: this.state.key + 1});
    }
  }


  onTimerUpdate(remainingTime) {
    if (remainingTime == 3 && !first) {
      Vibration.vibrate(100);
      Speech.speak(
        '3 seconds',
        {
          voice: 'com.apple.ttsbundle.siri_Aaron_en-US_compact' // modularize this so it uses owners siri voice?
      });
      third = false;
      second = false;
      first = true;
    } else if (remainingTime == 2 && !second) {
      Vibration.vibrate(100);
      third = false;
      first = false;
      second = true;
    } else if (remainingTime == 1 && !third) {
      Vibration.vibrate(100);
      second = false;
      first = false;
      third = true;
    }
    return (
      <View style={styles.CenterItems}>
            <Text style={styles.PracticeTimerTextStyle}>{this.state.message}</Text>
            <Text style={styles.PracticeTimeTextStyle}>{getTimeText(remainingTime)}</Text>
      </View>
    );
  }

  Item = ({ text, style }) => (
    <View>
      <Text style={style}>{text}</Text>
    </View>
  );

  renderItem = ({ item }) => {
    let opacity = 1.0 / (Math.abs(item.id - this.state.durationIndex) + 1);
    let style = {
      color: LIGHT,
      fontSize: 20,
      fontFamily: 'Verdana-Bold',
      margin: 2,
      opacity: {opacity}
    }
    return(
      <this.Item
        text={item.time}
        style={style}
      />
    )
  }

  render() {
    let listData = [];
    let leftInd = this.state.durationIndex - 2;
    let rightInd = this.state.durationIndex + 3;
    let leftDiff = leftInd * -1;
    let rightDiff = ((this.state.timerDurations.length - 1) - rightInd) * -1;
    if (leftInd < 0) {
      leftInd = 0
    }
    if (rightInd >= this.state.timerDurations.length) {
      rightInd = this.state.timerDurations.length - 1
    }
    listData = intervalsForList.slice(leftInd, rightInd);
    for (let i = 0; i < leftDiff; i++) {
      listData.unshift({id: -1 * (i+1), time: ' ', type: ' '});
    }
    for (let i = 0; i < rightDiff; i++) {
      if (i == 0) {
        listData.push({id: this.state.timerDurations.length - 1, time: 'session complete', type: ''});
        continue;
      }
      listData.push({id: this.state.timerDurations.length + i, time: ' ', type: ' '});
    }



    return(
    <View style={styles.CO2PracticeScreenStyle}>
      {waves}
      <View style={styles.Circle}>
        <Text style={styles.IntervalProgressText}>{(this.state.durationIndex + 1) > (this.state.timerDurations.length - 1) ? ' ' : 'Interval ' + (this.state.durationIndex + 1) + ' of ' + (this.state.timerDurations.length-1)}</Text>
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
          {({ remainingTime }) => this.onTimerUpdate(remainingTime) }
        </CountdownCircleTimer>
      </View>
      <View style={styles.PlaceHolder}></View>
      <View style={styles.CO2PracticeScreenStyle}>
      {/* make a dropdown menu for table selection here 
          onSelect will trigger new getTable() lookup     */}
      <Text style={styles.TableTitleTextStyle}>{this.state.tableTitle}</Text>
      <View style={{marginTop: 30}}>
        <SelectDropdown
          data={tableList}
          onSelect={(selectedItem, index) => {
            setSelectedId(selectedItem.id).then(console.log("set selected id"));
            this.asyncSetup(index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
            return this.state.defaultSelectionText;
          }}
          rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
            return item.title;
          }}
          buttonStyle={styles.HomeButtonStyle}
          buttonTextStyle={styles.HomeButtonTextStyle}
          defaultButtonText={this.state.defaultSelectionText}
          dropdownStyle={styles.DropDownStyle}
          selectedRowStyle={styles.SelectedRowStyle}
          selectedRowTextStyle={styles.SelectedRowTextStyle}
          rowTextStyle={styles.HomeButtonTextStyle}
        />
      </View>
      <TouchableOpacity
        style = {styles.HomeButtonStyle}
        onPress={this.onButtonPress}
      >
        <Text style={styles.HomeButtonTextStyle}>{this.state.buttonText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.SkipButtonStyle}
        onPress={this.onSkipPress}
      >
        <Text style={styles.HomeButtonTextStyle}>skip</Text>
      </TouchableOpacity>
      {/* <FlatList
        data={listData}
        renderItem={({ item }) => 
        <View style={styles.IntervalContainer}>
          <View style={
            {   
              width: '80%',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: LIGHT,
              opacity: 1.0 / (Math.abs(item.id - this.state.durationIndex) + 1),
            }
          }>
            <Text style={
              {
                color: LIGHT,
                fontSize: 20,
                fontFamily: 'Verdana-Bold',
                margin: 2,
                opacity: 1.0 / (Math.abs(item.id - this.state.durationIndex) + 1),
              }
            }>{item.type}{item.time}</Text>
          </View>
        </View>}
        keyExtractor={item => item.id}
        //numColumns={listData.length}
        //key={listData.length}
        scrollEnabled={false}
      /> */}
      </View>
    </View>
    );
  }
}

function getTimeText(time) {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  let minutesString = "" + minutes;
  let secondsString = "" + seconds;
  if (minutesString.length < 2) {
    minutesString = "0" + minutesString;
  }
  if (secondsString.length < 2) {
    secondsString = "0" + secondsString;
  }
  let timeString = minutesString + ":" + secondsString;
  return timeString;
}


export function PracticeScreen() {
    return (
      <View style={styles.CO2PracticeScreenStyle}>
        <PracticeTimer/>
      </View>
    );
  }