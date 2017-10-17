import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { Redirect } from 'react-router-native'
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
  constructor() {
    super();
    this.state = {
      redirect: false,
    }
  }

  handleOnClick = () => {
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.props.to} />
    }

    return (
      <Button onPress={this.handleOnClick} style={[styles.button].concat(this.props.extraStyles)} light full>
        <Text style={[styles.centeredText, styles.buttonText]}>{this.props.buttonText}</Text>
      </Button>
    );
  }
}