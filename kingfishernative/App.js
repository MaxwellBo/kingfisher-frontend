import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native'
import PageIndex from "./src/PageIndex"
import PageSites from "./src/PageSites"
import { styles } from "./src/Styles"


/*
 * The very top component. Handles which page is active.
 */
export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.app}>
          <Route exact path="/" component={PageIndex}/>
          <Route path="/sites" component={PageSites} />
        </View>
      </NativeRouter>
    )
  }
}