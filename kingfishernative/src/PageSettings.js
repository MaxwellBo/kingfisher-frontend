import React from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
import { Route } from 'react-router-native'
import { styles } from "./Styles"
import { fbi } from "./Global"
import PageSiteTrees from "./PageSiteTrees"
import PageAddTree from "./PageAddTree"
import AccordionViewSite from "./AccordionViewSite"
import Field from "./Field"
import PageVizTree from "./PageVizTree"

// A component which allows users to add a new site to the database.
class AddSite extends React.Component {
  constructor() {
    super();
    this.state = {
      newSiteCode: "",
    }
  }

  // Updates the state with the value of the field.
  changeNewSiteCode = (code) => {
    this.setState({newSiteCode: code});
  }

  componentDidMount() {
    fbi.database().ref("sites").on("value", function(val) {
      if(val) {
        this.setState({takenSites: Object.keys(val.val())});
      }
    });
  }
  
  // Pushes an empty new site to the firebase database.
  addNewSite = () => {

    let keys = this.state.takenSites;
    for(let i=0; i<keys.length; i++) {
      if(keys[i] === this.state.newSiteCode) {
        return;
      }
    }

    if (this.state.newSiteCode !== "") {
      const ref = fbi.database().ref("sites").child(this.state.newSiteCode);

      ref.keepSynced(true);

      // Pushing an empty string is the only way to get a key/value pair
      // to exist without having any real value. This prevents unwanted
      // placeholder data from appearing in measurements, while still
      // allowing the measurements key to exist.
      ref.set({measurements:""});
      this.setState({ newSiteCode: "" });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.siteAddCont}>
          <Field
            extraStyles={styles.siteAddField}
            onChangeText={(text) => this.changeNewSiteCode(text)}
            value={this.state.newSiteCode}
            />
          <TouchableHighlight
            // This is the submit button for the new site.
            onPress={() => {
              this.addNewSite();
              // We go back instead of pushing to history or redirecting
              // because we don't want this page saved in the router history.
              this.props.goBack()}
            }
            accessibilityLabel="Add New Site"
            style={styles.siteAddButton}
            >
            <Text style={{fontSize: 20, textAlign: "center"}}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

// Originally this page was intended to set global settings, 
// but due to time constraints it was only able to be used as a way to render
// the add new sites component.
export default class PageSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content contentContainerStyle={styles.pageCont}>
        <View>
          <Text style={styles.pageHeadTitle}>Add New Site</Text>
          <Text style={styles.pageHeadDesc}>Type the desired site code below, then tap the plus icon.</Text>
        </View>

        <AddSite goBack={this.props.history.goBack}/>
        <View style={styles.sites}>
        </View>
      </Content>
    )
  }
}