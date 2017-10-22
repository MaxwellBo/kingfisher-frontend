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

/**
 * A site that expands to reveal all site records within it.
 */
export default class AccordionViewSite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: false,
      collapsed: true,
      siteRecords: {},
      // This is a ref to the firebase database section containing all measurements
      // (site records) that are related to the given site.
      siteRecordsRef: fbi.database().ref("sites").child(props.siteCode).child("measurements")
    };

    this.state.siteRecordsRef.keepSynced(true);
  }

  // When the component mounts, get the data from the ref and start watching it for changes.
  // If it changes, update the state.
  componentDidMount() {
    this.state.siteRecordsRef
      .on('value', (siteRecords) => {
        if (siteRecords) {
          this.setState({ siteRecords: siteRecords.val() });
        }
      });
  }

  // When the component unmounts, turn the watch on the ref off.
  // This is so that we don't update the state of an unmounted component.
  componentWillUnmount() {
    this.state.siteRecordsRef.off();
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { siteRecords } = this.state;
    // After firebase watch has turned on, but before the data is retrieved, there is a brief moment
    // when the state attribute it changes is null. This ternary operator is to ensure a null
    // object is not handled (if it's null just return an empty <View/>)
    const siteRecordComponents = (siteRecords && typeof(siteRecords) ==	"object") ? Object.keys(siteRecords).map(date =>
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
    // Format the date to a readable string
    const nowString = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay() + "::" +
      now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    return (
      <View>
        <TouchableHighlight style={styles.treeEntry} onPress={this._toggleExpanded}>
          <View style={styles.treeName} accessibilityLabel={this.props.siteCode}>
            <Text style={styles.siteTreeText}>Site {this.props.siteCode}</Text>
            <Image style={styles.dropdownArrow} source={
              // Depending on if it's collapsed or not, render a different
              // direction arrow image.
              this.state.collapsed ?
              require("./img/dropdownDown.png") :
              require("./img/dropdownUp.png")
              } />
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.treeDropdown} accessibilityLabel={this.props.siteCode + "view"}>
            { // The list of site records taken at this particular site.
              siteRecordComponents}
            <LinkButton to={this.props.to + "/" + nowString} buttonText="Add New Site Record" />
          </View>
        </Collapsible>
      </View>
    );
  }
}
