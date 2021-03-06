import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';
import { styles } from "./Styles"
import Collapsible from 'react-native-collapsible';
import LinkButton from "./LinkButton";

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
            { // The accordion only contains data about the tree
            }
            <Text style={styles.siteTreeText}>Species: {this.props.species}</Text>
            <Text style={styles.siteTreeText}>Height (cm): {this.props.height}</Text>
            <Text style={styles.siteTreeText}>DBHs (mm): {stringifiedDBHS}</Text>
            <LinkButton
              buttonText="Edit"
              to={"/sites/" + this.props.siteCode + "/" + this.props.date + "/edit/" + this.props.treeName}
            />
            <TouchableHighlight 
              onPress={() => this.props.deleteTree(this.props.treeName)}
              style={[styles.button, styles.delete]}>
              <Text style={[styles.centeredText, styles.buttonText]}>Delete</Text>
            </TouchableHighlight>
          </View>
        </Collapsible>
      </View>
    );
  }
}