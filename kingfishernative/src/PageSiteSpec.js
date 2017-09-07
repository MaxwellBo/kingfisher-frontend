import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "./Styles"
import Title from "./Title"
import Field from "./Field"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is a form that creates a new site to add trees to.
 * Confirming the selection should lead to the trees input screen.
 * Cancelling should lead back to the site main menu.
 */
export default class PageSiteSpec extends React.Component {
  constructor() {
    super();
    this.state = { 
      length: 0,   
      width: 0,
      section: 0,
      species: 0,
      threshold: 0,
      recorder: 0,
      date: 0,
    }
  }

  changeSpec(specName, value) {
    console.log(this.state.length);
    let stateCopy = Object.assign({}, this.state);
    stateCopy[specName.toLowerCase()] = value;
    console.log(stateCopy);
    this.setState(stateCopy);
  }

  render() {
    return (
      <View>
        <View style={[styles.pageCont, styles.siteSpec]}>
          <View style={styles.centerItemsCont}>
            <Text style={styles.pageHeadTitle}>Site Specifications</Text>
            <Text style={styles.pageHeadDesc}>Dimensions</Text>
          </View>
          <View style={styles.horizontalFlexCont}>
            <Field label="Length" name="length" 
              extraStyles={styles.thirds} onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="Width" name="width" 
              extraStyles={styles.thirds} onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="Section" name="section" 
              extraStyles={styles.thirds} onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          </View>
          <Field label="Species" name="species" // TODO: Convert this to dropdown menu
              inputStyles={styles.error}
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          <Field label="Threshold" name="threshold" 
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          <Field label="Recorder" name="recorder" // Maybe not necessary with login?
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          <Field label="Date" name="date" // TODO: Change to date selector
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          <View style={styles.horizontalFlexCont}>
          </View>
        </View>
      </View>
    )
  }
}