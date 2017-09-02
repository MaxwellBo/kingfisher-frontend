import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { styles } from "./Styles"
import Collapsible from 'react-native-collapsible';

export default class AccordionView extends Component {
  state = {
    activeSection: false,
    collapsed: true,
  };

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._toggleExpanded}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.treeName}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.content}>
            <Text>Height: 1</Text>
            <Text>Species: JQuery Tree</Text>
            <Text>Width: 3</Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}