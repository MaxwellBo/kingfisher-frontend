import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { styles } from "./Styles"

/*
 * An input field with label.
 * Ensure it is passed props:
 *  - label
 *  - name (the key of parent state you want it to change onChangeText)
 *  - onChangeText (should change parent's state)
 * 
 * An optional 4th prop, extraStyles, can be used to give it another
 * object's worth of styles.
 * An optional 5th prop, inputStyles, can be used to give the input
 * box extra styles.
 */
export default class Field extends React.Component {
  render() {
    return (
      <View style={[styles.field].concat(this.props.extraStyles)}>
        <Text style={styles.fieldLabel}>{this.props.label}</Text>
        <View style={[styles.fieldInputCont].concat(this.props.inputStyles)}>
          <TextInput style={styles.fieldInput}
              onChangeText={(value) => this.props.onChangeText(this.props.name, value)}
          />
        </View>
      </View>
    )
  }
}