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
export default class PageHomeHome extends React.Component {
  render() {
    return (
      <View>
        <Title
          titleInfo={"Home"}
          goBack={() => this.props.goBack()}
        />
        <View style={[styles.pageCont, styles.siteHome]}>
          <View>
            <Text style={styles.pageHeadTitle}>Welcome!</Text>
            <Text style={styles.pageHeadDesc}>Add a new site record to get started.</Text>
          </View>
          <View style={styles.siteHomeButtonCont}>
            <GreenButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Add New Site Record"
              pageName="enterSiteNewRecord"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
            <GreenButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Download Site Data"
              pageName="enterSiteDownload" // TODO: Change these pagenames
              changePage={(pageName) => this.props.changePage(pageName)}
            />
            <GreenButton
              extraStyles={[styles.siteHomeButton]}
              buttonText="Navigate to Site"
              pageName="enterSiteNavigate"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
          </View>
        </View>
      </View>
    )
  }
}