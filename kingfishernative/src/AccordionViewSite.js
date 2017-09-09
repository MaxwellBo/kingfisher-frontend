import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { styles } from "./Styles"
import Collapsible from 'react-native-collapsible';
import { Link } from 'react-router-native';
import LinkButton from "./LinkButton"
import { fbi } from "./Global"

export default class AccordionViewSite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: false,
      collapsed: true,
      siteRecords: {},
      siteRecordsRef: fbi.database().ref("sites").child(props.siteCode),
    };
  }

  componentDidMount() {
    this.state.siteRecordsRef
      .on('value', (siteRecords) => {
        if (siteRecords) {
          this.setState({ siteRecords: siteRecords.val() });
        }
      });
  }

  componentWillUnmount() {
    this.state.siteRecordsRef.off();
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { siteRecords } = this.state;
    const siteRecordComponents = (siteRecords == null) ? <View/> : Object.keys(siteRecords).map(date => 
      <Link
        to={this.props.to + "/" + date}
        style={styles.siteButton}
        key={this.props.to + "/" + date}
        >
        <Text style={styles.siteButtonText}>
          {
            // Just get the "date" part of `date` (not the time part)
            date.split("::")[0]
          }
        </Text>
      </Link>
    );
    const now = new Date();
    const nowString = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay() + "::" +
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return (
      <View>
        <TouchableHighlight style={styles.treeEntry} onPress={this._toggleExpanded}>
          <View style={styles.treeName}>
            <Text style={styles.siteTreeText}>Site {this.props.siteCode}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.treeDropdown}>
            {siteRecordComponents}
            <LinkButton to={this.props.to + "/" + nowString} buttonText="Add New Measurement" />
          </View>
        </Collapsible>
      </View>
    );
  }
}