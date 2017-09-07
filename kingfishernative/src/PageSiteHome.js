import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Route } from 'react-router-native'
import { styles } from "./Styles"
import Title from "./Title"
import LinkButton from "./LinkButton"

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
          titleInfo={this.props.location.pathname}
          goBack={() => this.props.history.goBack()}
        />
        <View style={[styles.pageCont, styles.siteHome]}>
          <View>
            <Text style={styles.pageHeadTitle}>Site Home</Text>
            <Text style={styles.pageHeadDesc}>Update Current Site Information and Add New Tree Measurements</Text>
          </View>
          <View style={styles.siteHomeButtonCont}>
            <LinkButton
              extraStyles={[styles.verticallyStackedButton]}
              buttonText="Add New Trees"
              to={"/trees/" + this.props.match.params.siteCode  }
            />
            <LinkButton
              extraStyles={[styles.verticallyStackedButton]}
              buttonText="Data Analysis"
              to="dataAnalysis" 
            />
            <LinkButton
              extraStyles={[styles.verticallyStackedButton]}
              buttonText="Site Information"
              to="spec"
            />
          </View>
        </View>
      </View>
    )
  }
}