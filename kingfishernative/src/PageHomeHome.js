import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Route } from 'react-router-native'
import { styles } from "./Styles"
import Title from "./Title"
import LinkButton from "./LinkButton"
import PageEnterSiteNewRecord from "./PageEnterSiteNewRecord"

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
        <Route path="/home">
          <Title
            titleInfo={this.props.location.pathname}
            goBack={() => this.props.history.goBack()}
          />
        </Route>
        <View style={[styles.pageCont, styles.siteHome]}>
          <View>
            <Text style={styles.pageHeadTitle}>Welcome!</Text>
            <Text style={styles.pageHeadDesc}>Add a new site record to get started.</Text>
          </View>
          <View style={styles.siteHomeButtonCont}>
            <LinkButton
              to="/home/sites/add"
              buttonText="Add New Site Record"
              extraStyles={styles.verticallyStackedButton}
            />
            <LinkButton
              to="/home/sync"
              buttonText="Sync Status"
              extraStyles={styles.verticallyStackedButton}
            />
            <LinkButton
              to="/home/sites/download"
              buttonText="Download Site Data"
              extraStyles={styles.verticallyStackedButton}
            />
            <Route path="/home/sites/add" component={PageEnterSiteNewRecord}/>
            {/* FIXME: The above route isn't matching properly - should printf the current address */}
            {/* TODO */}
            {/* TODO */}
          </View>
        </View>
      </View>
    )
  }
}