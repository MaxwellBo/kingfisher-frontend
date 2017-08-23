import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { styles } from "./Styles"

/*
 * A green button for changing pages.
 * Must be passed the following props:
 *  - changePage() (should be passed down all the way from App)
 *  - buttonText (the text in the button)
 *  - pageName (the page the button leads to. See AppScreen's render function for options)
 * 
 * An optional 4th prop, extraStyles, can be used to give it another
 * object's worth of styles.
 */
export default class GreenButton extends React.Component {
  render() {
    return (
      <TouchableHighlight 
          onPress={() => this.props.changePage(this.props.pageName)}
          accessibilityLabel={this.props.pageName}
          style={[styles.button].concat(this.props.extraStyles)} >
        <Text style={[styles.centeredText, styles.buttonText]}>{this.props.buttonText}</Text>
      </TouchableHighlight>
    )
  }
}