import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';
import { Container, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { styles } from "./Styles"
import SpecialButton from "./SpecialButton"
import Title from "./Title"
import Field from "./Field"
import { fbi } from "./Global"

/**
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is for creating a new tree measurement for a particular site.
 * <View style={{height: Dimensions.get('window').height}}>
 */
export default class PageAddTree extends React.Component {
  constructor() {
    super();
    this.state = {
      species: "",
      height: 0,
      dbhs: [],
      speciesValid: -1,
      heightValid: -1,
      dbhsValid:[],
    }

  }

  push = () => {
    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    // FIXME: this should probably be passed down a prop from `SiteTrees`
    const ref = fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees').push();
    ref.set({
      species: this.state.species,
      height: this.state.height,
      dbhs : this.state.dbhs
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

  DBHChangeText(dbhIndex, value) {
    newDbhs = this.state.dbhs;
    newDbhsIndex = this.state.dbhsValid;
    if (dbhIndex == newDbhs.length - 1 && value == "") { 
      // If it is the last DBH and it's been deleted
      newDbhs.pop(dbhIndex); // Remove it from the list
      newDbhsIndex.pop(dbhIndex);
    } else if (dbhIndex <= newDbhs.length) { // Otherwise, as long as its a valid index
      newDbhs[dbhIndex] = value; // TODO: Validate inputs
      newDbhsIndex[dbhIndex] = -1;
    }
    this.setState({dbhs: newDbhs, dbhsIndex: newDbhsIndex});
  }

  validInput(fieldName) {
    if (fieldName === "species") {
      this.checkSpecies();
    } else if (fieldName === "height") {
      this.checkHeight();
    } else {
      this.checkDbhs();
    }
  }

  checkDbhs() {
    for(let i=0; i<this.state.dbhs.length; i++) {
      if(isNaN(Number(this.state.dbhs[i])) || this.state.dbhs[i] < 0) {
        newDbhs = this.state.dbhsValid;
        newDbhs[i] = 0;
        this.setState({dbhsValid: newDbhs});
      } else {
        newDbhs = this.state.dbhsValid;
        newDbhs[i] = 1;
        this.setState({dbhsValid: newDbhs});
      }
    }
  }

  checkSpecies() {
    if(this.state.species === "") {
      this.setState({speciesValid: 0});
    } else {
      this.setState({speciesValid: 1});
    }
  }

  checkHeight() {
    if(this.state.height < 200 || isNaN(Number(this.state.height))) {
      this.setState({heightValid: 0});
    } else {
      this.setState({heightValid: 1});
    }
  }

  render() {
    dbhList = [];
    // FIXME: Use for .. in rather than indexed iterations
    for (let i = 0; i <= this.state.dbhs.length; i++) {
      dbhList.push(
        <Field label={"DBH " + (i+1)} name={i} key={"DBH " + i}
          onChangeText={(dbhIndex, value) => this.DBHChangeText(dbhIndex, value)}
               onEndEditing={(fieldName, text) => this.validInput(fieldName, text)}
               inputStyles={(this.state.dbhsValid[i] == 0) && {backgroundColor: '#DD4649'}
               || (this.state.dbhsValid[i] == 1) && {backgroundColor: '#96DD90'}
               || (this.state.dbhsValid[i] == -1) && {backgroundColor: '#898689'}}/>
      )
    }
    return (
      <Content contentContainerStyle={styles.pageCont}>
        <View>
          <Text style={styles.pageHeadTitle}>Add Tree Record</Text>
        </View>
        <View style={styles.verticalFlexCont}>
          <Field label="Species" name="species"
            onChangeText={(specName, value) => this.changeSpec(specName, value)}
                  inputStyles={(this.state.speciesValid === 0) && {backgroundColor: '#DD4649'}
                  || (this.state.speciesValid === 1) && {backgroundColor: '#96DD90'}
                  || (this.state.speciesValid === -1) && {backgroundColor: '#898689'}}
                  onEndEditing={(fieldName, text) => this.validInput(fieldName, text)}/>
          <Field label="Tree Height (cm)" name="height"
            onChangeText={(specName, value) => this.changeSpec(specName, value)}
                  inputStyles={(this.state.heightValid === 0) && {backgroundColor: '#DD4649'}
                  || (this.state.heightValid === 1) && {backgroundColor: '#96DD90'}
                  || (this.state.heightValid === -1) && {backgroundColor: '#898689'}}
                  onEndEditing={(fieldName, text) => this.validInput(fieldName, text)}/>
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
              if(this.state.speciesValid === 1 && this.state.heightValid === 1) {
                if(this.state.dbhs.length === 0) {
                  return false;
                }
                // FIXME: Use for .. in rather than indexed iterations
                for(let i=0; i<this.state.dbhsValid.length; i++) {
                  if(this.state.dbhsValid[i] === 0) {
                    return false;
                  }
                }
                this.push();
                this.props.history.goBack();
              } else {
                return false;
              }
            }
          }
        />
      </Content>
    )
  }
}