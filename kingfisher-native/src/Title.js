import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { styles } from "./Styles"

export default class Title extends React.Component {
  render() {
    return (
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <TouchableHighlight onPress={() => this.props.goBack()}>
            <Image
              style={styles.titleBack}
              source={require("./img/icon_back.png")} 
            />
          </TouchableHighlight>
        </View>
        <View style={styles.titleRight}>
          <Text style={styles.titleText}>{this.props.titleInfo}</Text>
        </View>
      </View>
    );
  }
}