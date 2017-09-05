import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { styles } from "./Styles"
import GreenButton from "./GreenButton"
import SpecialButton from "./SpecialButton"
import Title from "./Title"
import Field from "./Field"
import { fbi } from "./Global"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is for creating a new tree measurement for a particular site.
        <View style={{height: Dimensions.get('window').height}}>
 */
export default class PageAddTree extends React.Component {
  constructor() {
    super();
    this.state = {
      species: "",
      height: 0,
      dbhs: [],
    }
  }

  push = () => {
    const ref = fbi.database().ref("sites").child(this.props.activeSite).child('trees').push();
    ref.set({
      species: this.state.species,
      height: this.state.height,
      dbhs : this.state.dbhs
    });
  }

  changeSpec(specName, value) {
    obj = {};
    obj[specName] = value;
    this.setState(obj);
  }
  DBHChangeText(dbhIndex, value) {
    console.log(dbhIndex);
    console.log(value);
    newDbhs = this.state.dbhs;
    if (dbhIndex == newDbhs.length - 1 && value == "") { 
      // If it is the last DBH and it's been deleted
      newDbhs.pop(dbhIndex); // Remove it from the list
    } else if (dbhIndex <= newDbhs.length) { // Otherwise, as long as its a valid index
      newDbhs[dbhIndex] = value; // TODO: Validate inputs
    }
    this.setState({dbhs: newDbhs});
    console.log(this.state.dbhs)
  } 
  render() {
    dbhList = [];
    for (let i = 0; i <= this.state.dbhs.length; i++) {
      dbhList.push(
        <Field label={"B" + (i+1)} name={i} key={"DBH " + i}
          onChangeText={(dbhIndex, value) => this.DBHChangeText(dbhIndex, value)}/>
      )
    }
    return (
      <View>
        <ScrollView
          contentContainerStyle={[styles.pageCont]}
          style={styles.scroller}
          showsVerticalScrollIndicator={true}
        >
          <View>
            <Text style={styles.pageHeadTitle}>Add Tree Record</Text>
          </View>
          <View style={styles.verticalFlexCont}>
            <Field label="Species" name="species"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="Tree Height" name="height"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          </View>
          <View style={styles.dbhCont}>
            <Text style={styles.h2}>
              DIAMETER AT BREAST HEIGHT
            </Text>
            {dbhList}
          </View>
          <SpecialButton 
            extraStyles={[styles.indexButton]}
            buttonText="Add"
            pageName="siteTrees"
            additionalOnClick={this.push}
            changePage={this.props.changePage}
          />
        </ScrollView>
      </View>
    )
  }
}