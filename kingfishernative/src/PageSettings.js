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

class AddSite extends React.Component {
  constructor() {
    super();
    this.state = {
      newSiteCode: "",
    }
  }

  changeNewSiteCode = (code) => {
    this.setState({newSiteCode: code});
  }
  
  addNewSite = () => {
    if (this.state.newSiteCode !== "") {
      const ref = fbi.database().ref("sites").child(this.state.newSiteCode);

      ref.keepSynced(true);

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
            onPress={() => {
              this.addNewSite();
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