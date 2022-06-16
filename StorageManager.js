import React, { useState } from 'react';
import { LIGHT, styles } from './Styles';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as SecureStore from 'expo-secure-store';

const numIntervals = 8;
const mediumDecrease = [0.5, 0.4375, 0.375, 0.3125, 0.25, 0.1875, 0.125, 0.0625];

// gets a table object of a given integer id
async function getTable(id) {
    let idString = 'table' + id;
    let result = await SecureStore.getItemAsync(idString);
    if (result) {
        return JSON.parse(result);
    } else {
        if (id == 0) {
            let co2table = 
            {
                id: 0,
                title: 'CO2 table',
                intervals: [15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0]
            }
            addTableRaw(co2table).then(console.log('added CO2table'));
            return co2table;
        } else if (id == 1) {
            let o2table = 
            {
                id: 1,
                title: 'O2 table',
                intervals: [15, 15, 13, 15, 11, 15, 9, 15, 8, 15, 6, 15, 4, 15, 2, 15, 0]
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
    return result;
}

export async function setCurrHold(newHold) {
    updateScalingTables(newHold);
    await SecureStore.setItemAsync('curr-hold', newHold);
     //.then(console.log('updated scaling tables'));
}

// scales the default o2 and co2 tables based on currhold
function updateScalingTables(newHold) {
    let co2table = getTable(0).then(console.log('got table with id 0'));
    let o2table = getTable(1).then(console.log('got table with id 1'));
    let minutes = newHold.substring(0, 2);
    let seconds = newHold.substring(3, 5);
    seconds = parseInt(seconds);
    // total seconds of the current hold
    seconds += 60 * parseInt(minutes);
    if (seconds < 30) {
      return;
    // this is proper intervals for a co2 table, not for o2 table tho
    } else {
      let intervals = []
      for (let i = 0; i < numIntervals; i++) {
        intervals.push(Math.round(seconds * mediumDecrease[i]));
        intervals.push(Math.round(seconds * 0.5));  
      }
      intervals.push(0);
      co2table.intervals = intervals;
      o2table.intervals = intervals;
    }

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

}

async function setMaxId() {

}


// gets the selected id of table to be used in practice
async function getSelectedId() {

}

async function setSelectedId() {

}