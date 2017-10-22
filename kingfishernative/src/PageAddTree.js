import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { Container, Content, Button, Left, Right, Body, Icon, Text, Form, Picker } from 'native-base';
import { styles } from "./Styles"
import SpecialButton from "./SpecialButton"
import Field from "./Field"
import { fbi } from "./Global"


const HEIGHT_MIN = 200;
const HEIGHT_MAX = 3000;
const Item = Picker.Item;
/**
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by App. 
 * 
 * This page is for creating a new tree measurement for a particular site.
 * <View style={{height: Dimensions.get('window').height}}>
 */
export default class PageAddTree extends React.Component {
  constructor() {
    super();

    this.state = {
      species: "",
      height: "",
      dbhs: [],
      speciesValid: -1,
      heightValid: -1,
      dbhsValid: [],
      existingTreeName: null
    }

  }

  componentWillMount() {
    const siteCode = this.props.match.params.siteCode;
    const date = this.props.match.params.date;
    const treeName = this.props.match.params.treeName ? this.props.match.params.treeName : null;

    // If treeName is not null, it means
    if (treeName) {
      const ref = fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees').child(treeName)
      ref.once("value", tree => {
        const fbTree = tree.val();
        this.setState({
          species: fbTree.species,
          height: fbTree.height,
          dbhs: fbTree.dbhs,
          speciesValid: 1, // existing data should already be valid
          heightValid: 1,
          dbhsValid: fbTree.dbhs.map((x) => { return 1 }),
          existingTreeName: treeName,
        });
      })
    }
  }

  // Push will push the current species, height and DBHs to firebase as a new tree if we are not
  // editing an existing tree. If we are editing an existing tree, update the data.
  push = () => {
    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    let ref;
    if (this.state.existingTreeName) {
      const treeName = this.props.match.params.treeName;
      ref = fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees').child(treeName);
    } else {
      ref = fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees').push();
    }
    ref.set({
      species: this.state.species,
      height: this.state.height,
      dbhs: this.state.dbhs
    });

    ref.keepSynced(true);
  }

  /**
   * Sets the state of this object with the key "specName", to the value "value"
   *
   * @param specName
   *    The key for this object
   * @param value
   *    The value to set for the key
   */
  changeSpec(specName, value) {
    obj = {};
    obj[specName] = value;
    this.setState(obj);
  }

  // Any species name should be valid (numeric codes, strings and combinations of the
  // two are all valid)
  changeSpecies = (value) => {
    this.setState({ species: value, speciesValid: 1 });
  }

  // Change the value of a DBH value of a particular index.
  DBHChangeText(dbhIndex, value) {
    newDbhs = this.state.dbhs;
    newDbhsIndex = this.state.dbhsValid;
    if (dbhIndex == newDbhs.length - 1 && value == "") {
      // If it is the last DBH and it's been deleted
      newDbhs.pop(dbhIndex); // Remove it from the list
      newDbhsIndex.pop(dbhIndex);
      // Recursively remove previous DBH if it's also empty.
      this.DBHChangeText(dbhIndex - 1, this.state.dbhs[dbhIndex - 1])
    } else if (dbhIndex <= newDbhs.length) { // Otherwise, as long as its a valid index
      newDbhs[dbhIndex] = value;
    }
    this.setState({ dbhs: newDbhs });
  }

  // Validates an input (this is called when a field is finished
  //  being edited.)
  validInput(fieldName) {
    if (fieldName === "species") {
      this.checkSpecies();
    } else if (fieldName === "height") {
      this.checkHeight();
    } else {
      this.checkDbhs();
    }
  }

  // Checks the DBHs fields for invalid data, and updates the state
  // with a list of values indicating whether the data is valid.
  checkDbhs() {
    for (let i = 0; i < this.state.dbhs.length; i++) {
      if (this.state.dbhs[i] <= 0 || isNaN(Number(this.state.dbhs[i]))) {
        newDbhs = this.state.dbhsValid;
        newDbhs[i] = 0;
        this.setState({ dbhsValid: newDbhs });
      } else {
        newDbhs = this.state.dbhsValid;
        newDbhs[i] = 1;
        this.setState({ dbhsValid: newDbhs });
      }
    }
  }

  // Checks if species is empty. If it is, it's invalid.
  // Otherwise, it's valid.
  checkSpecies() {
    if (this.state.species === "") {
      this.setState({ speciesValid: 0 });
    } else {
      this.setState({ speciesValid: 1 });
    }
  }

  checkHeight() {
    if (this.state.height < HEIGHT_MIN || isNaN(Number(this.state.height))) {
      this.setState({ heightValid: 0 });
    } else {
      this.setState({ heightValid: 1 });
      if (this.state.height > HEIGHT_MAX) {
        // Warn user if height is above 30m
        this.heightWarningAlert()
      }
    }
  }

  // Inform the user if their height value is unusually high. 
  heightWarningAlert() {
    Alert.alert(
      "You input height as " + this.state.height + "cm. Is this accurate? It seems too high."
    )
  }

  // Alert the user (called when invalid data is attempted to be submitted)
  invalidFormAlert() {
    // Constructs a message based on which fields were invalid.
    let message = "Submission failed:\n";
    message += (this.state.speciesValid !== 1 ? "✘ Invalid species\n" : "");
    message += (this.state.heightValid !== 1 ? "✘ Invalid height - ensure measurement is in cm\n" : "");
    message += (this.state.dbhs.length < 1 ? "✘ No DBH measurement recorded\n" : "");
    for (let i = 0; i < this.state.dbhsValid.length; i++) {
      if (this.state.dbhsValid[i] != 1) {
        message += "✘ Invalid DBH " + (1 + i) + " - ensure measurement is in mm";
      }
    }
    Alert.alert(
      message
    )
  }

  render() {
    dbhList = [];
    // The DBH fields to render. Based on how many are have already been filled out.
    for (let i = 0; i <= this.state.dbhs.length; i++) {
      dbhList.push(
        <Field
          label={"DBH " + (i + 1)}
          key={"DBH " + i}
          keyboardType="decimal-pad"
          onChangeText={(value) => this.DBHChangeText(i, value)}
          inputStyles={(i == this.state.dbhs.length) && { backgroundColor: '#898689' }
            || (this.state.dbhsValid[i] == 0) && { backgroundColor: '#DD4649' }
            || (this.state.dbhsValid[i] == 1) && { backgroundColor: '#96DD90' }
            || (this.state.dbhsValid[i] == -1) && { backgroundColor: '#898689' }}
          value={this.state.dbhs[i]}
          onEndEditing={(text) => this.validInput(i, text)} />
      )
    }

    return (
      <Content contentContainerStyle={styles.pageCont}>
        <View>
          <Text style={styles.pageHeadTitle}>{this.state.existingTreeName ? "Edit Tree Record" : "Add Tree Record"}</Text>
        </View>
        <View style={styles.verticalFlexCont}>
          <Text style={styles.fieldLabel}>Species</Text>
          <Form>
            <Picker
              // A dropdown menu for species selection
              style={(this.state.speciesValid === -1) && styles.fieldInputDropdown
                || (this.state.speciesValid === 1) && styles.fieldInputDropdownOk
                || (this.state.speciesValid === 0) && styles.fieldInputDropdownBad}
              iosHeader="Select species"
              mode="dropdown"
              selectedValue={this.state.species}
              onValueChange={this.changeSpecies}
            >
              { // The list of marine plants the client gave us as options for species
              // to be selected from the dropdown menu.
              }
              <Item label="Avicennia marina" value="Avicennia marina" />
              <Item label="Bruguiera gymnorhiza" value="Bruguiera gymnorhiza" />
              <Item label="Ceriops australis" value="Ceriops australis" />
              <Item label="Excoecaria agallocha" value="Excoecaria agallocha" />
              <Item label="Rhizophora stylosa" value="Rhizophora stylosa" />
              <Item label="Sarcocornia quinqueflora" value="Sarcocornia quinqueflora" />
              <Item label="Sporobolus virginicus" value="Sporobolus virginicus" />
              <Item label="Suaeda arbusculoides" value="Suaeda arbusculoides" />
              <Item label="Suaeda australis" value="Suaeda australis" />
            </Picker>
          </Form>
          <Field
            label="Tree Height (cm)"
            defaultValue={"" + this.state.height}
            keyboardType="decimal-pad"
            placeholder={HEIGHT_MIN.toString()}
            onChangeText={(value) => this.changeSpec("height", value)}
            inputStyles={(this.state.heightValid === 0) && { backgroundColor: '#DD4649' }
              || (this.state.heightValid === 1) && { backgroundColor: '#96DD90' }
              || (this.state.heightValid === -1) && { backgroundColor: '#898689' }}
            onEndEditing={(text) => this.validInput("height", text)}
            value={this.state.height}
          />
        </View>
        <View style={styles.dbhCont}>
          <Text style={styles.h2}>
            Diameter At Breast Height (mm)
          </Text>
          {dbhList}
        </View>
        <SpecialButton
          extraStyles={[styles.indexButton]}
          buttonText="Add"
          onClick={() => {
            // Check all the fields for invalid data and update the
            // corresponding state values.
            this.checkSpecies();
            this.checkHeight();
            this.checkDbhs();
            // If all fields are valid and at least one DBH is filled,
            // push the data to firebase and "go back" in history.
            // This is so that the AddTree page is not saved to the react-router
            // history, for consistency in the back button, and so that we
            // return to the main trees page.
            if (this.state.speciesValid === 1 &&
              this.state.heightValid === 1 &&
              this.state.dbhs.length > 0) {
              for (let i = 0; i < this.state.dbhsValid.length; i++) {
                if (this.state.dbhsValid[i] !== 1) {
                  // If not all DBHs are valid, throw an alert.
                  this.invalidFormAlert();
                  return false;
                }
              }
              this.push();
              this.props.history.goBack();
            } else {
              // If height or species are not valid, or there are no DBH fields
              // filled, throw an alert.
              this.invalidFormAlert();
              return false;
            }
          }
          }
        />
      </Content>
    )
  }
}
