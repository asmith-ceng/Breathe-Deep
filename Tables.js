import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList, AppRegistry, TouchableOpacity, Vibration } from 'react-native';
import { LIGHT, styles } from './Styles';
import { getTable as getTableFromSM, getSelectedId, getUsedIds, setSelectedId } from './StorageManager';

// update these to scale with longest hold time
// generate perms by reading tables from secure storage
var TABLES = []

async function getTables() {
  TABLES = [];
  // get current selected id, dont just use 0
  let usedIds = await getUsedIds();


  for (let i = 0; i < usedIds.length; i++) {
    let table = await getTableFromSM(usedIds[i]);
    TABLES.push(table);
  }
  return TABLES;
}

class TableList extends React.Component {
  state = {
    tables: [],
  }

  constructor(props) {
    super(props);
    getTables().then(result => this.setTables(result));
  }

  setTables(tables) {
    this.setState({tables: tables.slice()});
    console.log(this.state.tables);
  }

  Item = ({ item }) => (
    <View style={styles.TableItemView}>
        <Text style={styles.TableTitle}>{item.title}</Text>
    </View>
  );

  renderItem() {
    return (
    <this.Item
        item={item}
    />
    );
  }

  render() {
    return (
      <View style={styles.TableScreenView}>
        <TouchableOpacity style={styles.HomeButtonStyle}>
          <Text style={styles.HomeButtonTextStyle}>add new table</Text>
        </TouchableOpacity>
        <FlatList
            data={this.state.tables}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
            <View style={styles.TableItemView}>
              <View style={styles.TableListPartView}>
                <Text style={styles.TableTitle}>{item.title}</Text>
              </View>
              <View style={styles.TableInfoView}>
                <TouchableOpacity>
                  <Text style={styles.TableTitle}>
                    {
                      (item.id == 0 || item.id == 1) ? 'i' : ''
                    }
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.TableListPartView}>
                <TouchableOpacity>
                  <Text style={styles.TableTitle}>
                    {
                      (item.id == 0 || item.id == 1) ? 'view' : 'edit'
                    }
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.TableListPartView}>
                <TouchableOpacity>
                  <Text style={styles.TableTitle}>
                    {
                      (item.id == 0 || item.id == 1) ? 'empty and inactive' : 'delete'
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            }
        />
      </View>
    );
  }
}
  

export function Tables() {
  return <TableList/>;
}

