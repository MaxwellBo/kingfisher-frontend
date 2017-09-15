import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from "./Styles"
import LinkButton from "./LinkButton"
import SpecialButton from "./SpecialButton"
import Title from "./Title"
import Field from "./Field"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is for creating a new tree measurement for a particular site.
 */
export default class PageAddTree extends React.Component {
  constructor() {
    super();
    this.state = {
      pendingSiteCode: "no code"
    }
  }

  changeSpec = (specName, value) => {
    const newState = {};
    newState[specName] = value
    this.setState(newState);
  }

  render() {
    return (
      <View>
        <View style={[styles.pageCont, styles.siteHome]}>
          <View>
            <Text style={styles.pageHeadTitle}>Enter Site Code</Text>
            <Text style={styles.pageHeadDesc}>New Site Record</Text>
          </View>
          <View>
            <Field label="Site Code" name="pendingSiteCode"
              onChangeText={this.changeSpec}/>
            
            <LinkButton
              buttonText="Begin Record"
              to={"/site/" + this.state.pendingSiteCode}
              // This button should also change the active site.
              // Below is how it was done on GreenButton.
              //additionalOnClick={() => this.props.changeActiveSite(this.state.pendingSiteCode)}
            />
          </View>
        </View>
      </View>
    );
  }
}