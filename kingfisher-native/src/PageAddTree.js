import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from "./Styles"
import GreenButton from "./GreenButton"
import Title from "./Title"
import Field from "./Field"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is for creating a new tree measurement for a particular site.
 */
export default class PageAddTree extends React.Component {
  render() {
    return (
      <View>
        <Title
          titleInfo={"Add Tree for Site " + this.props.activeSite}
          goBack={() => this.props.goBack()}
        />
        <ScrollView contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
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
            <Field label="B1" name="DBH1"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="B2" name="DBH2"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="B3" name="DBH3"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="B4" name="DBH4"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            <Field label="B5" name="DBH5"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}