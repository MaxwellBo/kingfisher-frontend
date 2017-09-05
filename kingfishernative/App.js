import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from "./src/AppScreen"
import { styles } from "./src/Styles"
import { fbi } from "./src/Global"


/*
 * The very top component. Handles which page is active.
 */
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSite: "000000",
    };
    this.changePage = this.changePage.bind(this);
    this.changeActiveSite = this.changeActiveSite.bind(this);
    this.goBack = this.goBack.bind(this);

    fbi.auth().signInWithEmailAndPassword('admin@kingfisher.com', 'password')
    .then((user) => {
      console.log('User successfully logged in', user)
    })
    .catch((err) => {
      console.error('User signin error', err);
    });
  }


  changeActiveSite(siteCode) {
    this.setState({
      activeSite: siteCode
    })
  }

  render() {
    return (
      <View style={styles.app}>
        <AppScreen
          changeActiveSite={(siteCode) => this.changeActiveSite(siteCode)}
          activeSite={this.state.activeSite}
        />
      </View>
    )
  }
}