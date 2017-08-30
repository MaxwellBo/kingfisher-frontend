import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from "./Styles"
import GreenButton from "./GreenButton"
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
    this.changeSpec = this.changeSpec.bind(this)
  }

  changeSpec(specName, value) {
    const newState = {};
    newState[specName] = value
    this.setState(newState);
  }

  render() {
    return (
      <View>
        <Title 
          titleInfo={"Enter Site Code"}
          goBack={() => this.props.goBack()}
        />
        <View style={[styles.pageCont, styles.siteHome]}>
          <View>
            <Text style={styles.pageHeadTitle}>Welcome!</Text>
            <Text style={styles.pageHeadDesc}>Add a new site record to get started.</Text>
          </View>
          <View>
            <Field label="Site Code" name="pendingSiteCode"
              onChangeText={(specName, value) => this.changeSpec(specName, value)}/>
            
            <SpecialButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Begin Record"
              pageName="siteHome"
              changePage={(pageName) => this.props.changePage(pageName)}
              additionalOnClick={() => this.props.changeActiveSite(this.state.pendingSiteCode)}
            />
          </View>
        </View>
      </View>
    );
  }
}