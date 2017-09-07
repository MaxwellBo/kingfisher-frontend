import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from "./Styles"
import Title from "./Title"
import Field from "./Field"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is for creating a new tree measurement for a particular site.
 */
export default class PlaceholderPage extends React.Component {
  render() {
    return (
      <View>
        <Title 
          titleInfo={"Placeholder page"}
          goBack={() => this.props.goBack()}
        />
        <View style={[styles.pageCont, styles.siteHome]}>
          <Text>Page does not exist yet</Text>
        </View>
      </View>
    );
  }
}