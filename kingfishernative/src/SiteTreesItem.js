import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { styles } from "./Styles"

/*
 * A representation of a tree measurement for use in PageSiteTrees
 * 
 * Clicking the eye icon should take the user to a page they can use
 * to review the measurement and possibly make edits.
 */
export default class SiteTreesItem extends React.Component {
  render() {
    return (
      <View style={styles.siteTreesItem}>
        <Text style={styles.siteTreeText}>
          {this.props.treeName}
        </Text>

        <View style={styles.siteTreeOption}>
          <Image
            source={require("./img/icon_location.png")}
            style={styles.siteTreeIcon}/>
          <Image
            source={require("./img/icon_eye.png")}
            style={styles.siteTreeIcon}/>
        </View>
      </View>
    )
  }
}