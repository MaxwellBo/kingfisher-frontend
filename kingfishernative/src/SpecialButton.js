import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import { styles } from "./Styles"

export default class SpecialButton extends React.Component {
  render() {
    return (
      <Button 
          full
          light
          onPress={this.props.onClick}
          accessibilityLabel={this.props.pageName}
          style={[styles.button].concat(this.props.extraStyles)} >
        <Text style={[styles.centeredText, styles.buttonText]}>{this.props.buttonText}</Text>
      </Button>
    )
  }
}