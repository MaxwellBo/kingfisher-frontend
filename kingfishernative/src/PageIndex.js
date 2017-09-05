import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'react-router-native'
import { styles } from "./Styles"
import GreenButton from "./GreenButton"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is the landing page.
 */
export default class PageIndex extends React.Component {
  render() {
    return (
      <View style={[styles.pageCont, styles.index]}>
        <View style={styles.centerItemsCont}>
          <Image style={styles.govtLogo} source={require("./img/qld_govt_logo.png")} />
        </View>
        <Text style={[styles.centeredText, styles.indexH1]}>
          Kingfisher
        </Text>
        <Text style={[styles.centeredText, styles.indexH2]}>
          Mangrove Monitoring App for the Queensland Herbarium
        </Text>
        <Link to='/home'><Text>Login</Text></Link>
      </View>
    )
  }
}
