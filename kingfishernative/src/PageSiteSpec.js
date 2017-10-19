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
            <Field label="Length"
              extraStyles={styles.thirds} 
              onChangeText={(value) => this.changeSpec("length", value)}/>
            <Field label="Width"
              extraStyles={styles.thirds} 
              onChangeText={(value) => this.changeSpec("width", value)}/>
            <Field label="Section"
              extraStyles={styles.thirds} 
              onChangeText={(value) => this.changeSpec("section", value)}/>
          </View>
          <Field label="Species" // TODO: Convert this to dropdown menu
              inputStyles={styles.error}
              onChangeText={(value) => this.changeSpec("species", value)}/>
          <Field label="Threshold" 
              onChangeText={(value) => this.changeSpec("threshold", value)}/>
          <Field label="Recorder" // Maybe not necessary with login?
              onChangeText={(value) => this.changeSpec("recorder", value)}/>
          <Field label="Date"// TODO: Change to date selector
              onChangeText={(value) => this.changeSpec("date", value)}/>
          <View style={styles.horizontalFlexCont}>
          </View>
        </View>
      </View>
    )
  }
}