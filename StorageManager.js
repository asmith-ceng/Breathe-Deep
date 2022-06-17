import React, { useState } from 'react';
import { LIGHT, styles } from './Styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as SecureStore from 'expo-secure-store';

const numIntervals = 8;
const mediumDecrease = [0.5, 0.4375, 0.375, 0.3125, 0.25, 0.1875, 0.125, 0.0625];
const o2BaseIntervals = [5, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0];
const co2BaseIntervals = [15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0]

// gets a table object of a given integer id
export async function getTable(id) {
    let idString = 'table' + id;
    let result = await SecureStore.getItemAsync(idString);
    if (result) {
        console.log('returning: ' + result);
        return JSON.parse(result);
    } else {
        if (id == 0) {
            let co2table = 
            {
                id: 0,
                title: 'CO2 table',
                intervals: co2BaseIntervals
            }
            addTableRaw(co2table).then(console.log('added CO2table'));
            return co2table;
        } else if (id == 1) {
            let o2table = 
            {
                id: 1,
                title: 'O2 table',
                intervals: o2BaseIntervals
            }
            addTableRaw(o2table).then(console.log('added O2table'));
            return o2table;
        }
        else { // something went wrong here
            alert('this table does not exist');
            return;
        }
    }
}

// something for ids in use?

//adds table with given id, title, and interval (should only be used to add CO2 and O2 default tables)
async function addTableRaw(table) {
    console.log(JSON.stringify(table));
    let idString = 'table' + table.id;
    await SecureStore.setItemAsync(idString, JSON.stringify(table));
}

// gets the current breath hold value
export async function getCurrHold() {
    let result = await SecureStore.getItemAsync('curr-hold');
    if (result) {
        return result;
    }
    setCurrHold('00:00').then(console.log(""));
    return '00:00';
}

export async function setCurrHold(newHold) {
    await SecureStore.setItemAsync('curr-hold', newHold);
    updateScalingTables(newHold).then(console.log(""));
}

// scales the default o2 and co2 tables based on currhold
async function updateScalingTables(newHold) {
    let co2table = await getTable(0);
    let o2table = await getTable(1);
    let minutes = newHold.substring(0, 2);
    let seconds = newHold.substring(3, 5);
    let co2Intervals = [];
    let o2Intervals = [];
    seconds = parseInt(seconds);
    // total seconds of the current hold
    seconds += 60 * parseInt(minutes);
    if (seconds < 30) {

      co2Intervals = co2BaseIntervals;
      o2Intervals = o2BaseIntervals;
    // this is proper intervals for a co2 table, not for o2 table tho
    } else {
      for (let i = 0; i < numIntervals; i++) {
        co2Intervals.push(Math.round(seconds * mediumDecrease[i]));
        co2Intervals.push(Math.round(seconds * 0.5));  

        o2Intervals.push(Math.round(seconds * mediumDecrease[i]));
        o2Intervals.push(Math.round(seconds * 0.5));  
      }
      co2Intervals.push(0);
      o2Intervals.push(0);
    }
    co2table.intervals = co2Intervals;
    o2table.intervals = o2Intervals;

    addTableRaw(co2table).then(console.log('updated CO2table'));
    addTableRaw(o2table).then(console.log('updated O2table'));
}

// deletes a table from list of tables, (shifts the ids ?)
async function deleteTable(id) {

}

// adds a table to store of tables given title and intervals
async function addTable(table) {

}

// gets the maximum id value of store of tables
async function getMaxId() {
    let maxId = await SecureStore.getItemAsync('maxId');
    if (maxId) {
      return JSON.parse(maxId);
    }
    setMaxId(1).then(console.log(""));
    return 1;
}

async function setMaxId(id) {
    await SecureStore.setItemAsync('maxId', JSON.stringify(id));
}


// gets the selected id of table to be used in practice
export async function getSelectedId() {
    let selectedId = await SecureStore.getItemAsync('selectedId');
    if (selectedId) {
      return JSON.parse(selectedId);
    }
    setSelectedId(0).then(console.log(""));
    return 0;
}

export async function setSelectedId(id) {
    await SecureStore.setItemAsync('selectedId', JSON.stringify(id))
    console.log('set selected id as ' + id);
}

export async function getUsedIds() {
    let usedIds = await SecureStore.getItemAsync('usedIds');
    if (usedIds) {
      return JSON.parse(usedIds);
    }
    setUsedIds([0, 1]).then(console.log(""));
    return [0, 1];
}

async function setUsedIds(ids) {
    await SecureStore.setItemAsync('usedIds', JSON.stringify(ids))
}