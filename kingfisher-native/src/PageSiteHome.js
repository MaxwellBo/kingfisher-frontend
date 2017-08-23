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
          titleInfo={this.props.titleInfo}
          goBack={() => this.props.goBack()}
        />
        <View style={[styles.pageCont, styles.siteHome]}>
          <GreenButton
            extraStyles={[styles.siteHomeButton]}
            buttonText="SITE SPECIFICATIONS"
            pageName="siteSpec"
            changePage={(pageName) => this.props.changePage(pageName)}
          />
          <GreenButton
            extraStyles={[styles.siteHomeButton]}
            buttonText="NEW TREES"
            pageName="siteTrees"
            changePage={(pageName) => this.props.changePage(pageName)}
          />
          <GreenButton
            extraStyles={[styles.siteHomeButton]}
            buttonText="NEW DENSITOMETER"
            pageName="siteTrees" // TODO: Change these pagenames
            changePage={(pageName) => this.props.changePage(pageName)}
          />
          <GreenButton
            extraStyles={[styles.siteHomeButton]}
            buttonText="REVIEW"
            pageName="siteTrees" // TODO: Change these pagenames
            changePage={(pageName) => this.props.changePage(pageName)}
          />
        </View>
      </View>
    )
  }
}