import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import { styles } from "./Styles"

// The special button operates a little bit like the LinkButton,
// but instead of a link redirect, it executes functions given to it
// through props when pressed. This is mainly used to call goBack on 
// react router when we don't want the page to be saved to history.
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