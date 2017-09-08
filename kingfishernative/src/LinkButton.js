import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'react-router-native'
import { styles } from "./Styles"


/*
 * A green button for changing pages.
 * Must be passed the following props:
 *  - buttonText (the text in the button)
 *  - to (the page the button leads to. See AppScreen's render function for options)
 * 
 * An optional 3rd prop, extraStyles, can be used to give it another
 * object's worth of styles.
 */
export default class LinkButton extends React.Component {
  render() {
    return (
      <Link to={this.props.to}>
        <View style={[styles.button].concat(this.props.extraStyles)}>
          <Text style={[styles.centeredText, styles.buttonText]}>{this.props.buttonText}</Text>
        </View>
      </Link>
    );
  }
}