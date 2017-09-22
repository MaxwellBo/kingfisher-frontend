import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { styles } from "./Styles"
import Collapsible from 'react-native-collapsible';

export default class AccordionViewTree extends Component {
  state = {
    activeSection: false,
    collapsed: true,
  };

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    let stringifiedDBHS = "";
    for (let i = 0; i < this.props.dbhs.length; i++) {
      stringifiedDBHS = stringifiedDBHS + this.props.dbhs[i];
      if (i < this.props.dbhs.length - 1) {
        stringifiedDBHS = stringifiedDBHS + ", ";
      }
    }
    return (
      <View>
        <TouchableHighlight style={styles.treeEntry} onPress={this._toggleExpanded}>
          <View style={styles.treeName}>
            <Text style={styles.siteTreeText}>Tree ID: {this.props.treeName}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.treeDropdown}>
            <Text style={styles.siteTreeText}>Species: {this.props.species}</Text>
            <Text style={styles.siteTreeText}>Height (cm): {this.props.height}</Text>
            <Text style={styles.siteTreeText}>DBHs (mm): {stringifiedDBHS}</Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}