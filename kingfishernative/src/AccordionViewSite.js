import React, { Component } from 'react';
import {
  Image,
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
      siteRecordsRef: fbi.database().ref("sites").child(props.siteCode).child("measurements")
    };

    this.state.siteRecordsRef.keepSynced(true);
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
    console.log(siteRecords)
    const siteRecordComponents = (siteRecords && typeof(siteRecords) == 	"object") ? Object.keys(siteRecords).map(date =>
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
    ) : <View/>;
    const now = new Date();
    const nowString = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay() + "::" +
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return (
      <View>
        <TouchableHighlight style={styles.treeEntry} onPress={this._toggleExpanded}>
          <View style={styles.treeName}>
            <Text style={styles.siteTreeText}>Site {this.props.siteCode}</Text>
            <Image style={styles.dropdownArrow} source={
              this.state.collapsed ?
              require("./img/dropdownDown.png") :
              require("./img/dropdownUp.png")
              } />
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.treeDropdown}>
            {siteRecordComponents}
            <LinkButton to={this.props.to + "/" + nowString} buttonText="Add New Site Record" />
          </View>
        </Collapsible>
      </View>
    );
  }
}
