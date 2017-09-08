import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native'
import PageIndex from "./src/PageIndex"
import PageSites from "./src/PageSites"
import { styles } from "./src/Styles"
import { fbi } from "./src/Global"


/*
 * The very top component. Handles which page is active.
 */
export default class App extends React.Component {
  constructor() {
    super();

    fbi.auth().signInWithEmailAndPassword('admin@kingfisher.com', 'password')
    .then((user) => {
      console.log('User successfully logged in', user)
    })
    .catch((err) => {
      console.error('User signin error', err);
    });
  }

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