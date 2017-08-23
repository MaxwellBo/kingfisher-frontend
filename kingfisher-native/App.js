import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from "./src/AppScreen"
import { styles } from "./src/Styles"

/*
 * The very top component. Handles which page is active.
 */
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: "index",
      activeSite: "000000",
      titleInfo: (<Text style={styles.titleText}>Placeholder</Text>),
      pageHistory: []
    };
    this.changePage = this.changePage.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  changePage(pageName) {
    this.setState({
      pageHistory: this.state.pageHistory.concat([this.state.currentPage]),
      currentPage: pageName
    })
    console.log(this.state.pageHistory)
  }

  goBack() {
    let copyHistory = this.state.pageHistory;
    let prevPage = this.state.pageHistory[this.state.pageHistory.length - 1]
    copyHistory.splice(copyHistory.length - 1, 1);
    this.setState({
      currentPage: prevPage,
      pageHistory: copyHistory,
    })
  }

  render() {
    return (
      <View style={styles.app}>
        <AppScreen
          currentPage={this.state.currentPage}
          changePage={(pageName) => this.changePage(pageName)}
          activeSite={this.state.activeSite}
          titleInfo={this.state.titleInfo}
          goBack={() => this.goBack()}
        />
      </View>
    )
  }
}