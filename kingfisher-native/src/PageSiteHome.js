import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "./Styles"
import Title from "./Title"
import GreenButton from "./GreenButton"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is the main menu once a site has been selected.
 */
export default class PageSiteHome extends React.Component {
  render() {
    return (
      <View>
        <Title
          titleInfo={"Site " + this.props.activeSite + "\nHome"}
          goBack={() => this.props.goBack()}
        />
        <View style={[styles.pageCont, styles.siteHome]}>
          <View>
            <Text style={styles.pageHeadTitle}>Site Home</Text>
            <Text style={styles.pageHeadDesc}>Update Current Site Information and Add New Tree Measurements</Text>
          </View>
          <View style={styles.siteHomeButtonCont}>
            <GreenButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Add New Trees"
              pageName="siteTrees"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
            <GreenButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Data Analysis"
              pageName="siteTrees" // TODO: Change these pagenames
              changePage={(pageName) => this.props.changePage(pageName)}
            />
            <GreenButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Site Information"
              pageName="siteSpec"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
          </View>
        </View>
      </View>
    )
  }
}