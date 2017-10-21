import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {Container, Content, Button, Left, Right, Icon, Text, Picker} from 'native-base';
import { styles } from "./Styles"
import { fbi } from "./Global"
import SitePickerComponent from "./SitePickerComponent";
import ChartComponent from "./ChartComponent";

/**
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen.
 *
 * This page is a view of all the tree measurements taken for a particular site.
 */
export default class PageVizTree extends React.Component {
  constructor(props) {
    super(props);

    const siteCode = this.props.match.params.siteCode;
    const date = this.props.match.params.date;

    this.state = {
      trees: {},
      dataRef: fbi.database(),
      language: "height",
      showHeight: true,
      textInputValue: '',
      currentSelectedSites: [[siteCode, date]],
      data: [],
    };

    // TODO FIGURE OUT HOW BEHAVIOUR IS OFFLINE

    // TODO FIGURE OUT WHAT HAPPENS WHEN WE UNMOUNT

    this.addToListOfSelectedData = this.addToListOfSelectedData.bind(this);
    this.removeFromListOfSelectedData = this.removeFromListOfSelectedData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    let siteRef = this.state.dataRef.ref("sites");

    for(let i=0; i<this.state.currentSelectedSites.length; i++) {
      siteRef.child(this.state.currentSelectedSites[i][0])
        .child("measurements")
        .child(this.state.currentSelectedSites[i][1])
        .child('trees')
        .once('value', (trees) => {
          if (trees) {
            this.setState({ trees: trees.val() });
          }
        });
    }

    siteRef.once('value', (trees) => {
      if(trees) {
        this.setState({ allData:trees.val() })
      }
    });
  }

  static getHeightForObject(allData) {
    let heights = [];
    for (let key in allData) {
      if (allData.hasOwnProperty(key)) {
        heights.push(allData[key]['height']);
      }
    }
    return heights;
  }

  static getDbhsForObject(allData) {
    let allDbhs = [];
    for (let key in allData) {
      if (allData.hasOwnProperty(key)) {
        let dbhsVals = allData[key]['dbhs'];
        for(let dbhsValKey in allData[key]['dbhs']) {
          if(dbhsVals.hasOwnProperty(dbhsValKey)) {
            allDbhs.push(dbhsVals[dbhsValKey]);
          }
        }
      }
    }
    return allDbhs;
  }

  /**
   * Returns a five-number summary of an array of integers. This summary will have the following keys:
   *
   * { num: 17, sum: 731, avg: 43, min: 3, q1: 23.25, median: 38, q3: 68.5, max: 92}
   */
  static getFiveNumberSummary(dataAsArray) {
    let ss = require('summary-statistics');
    return ss(dataAsArray);
  }

  static formatBoxPlotDataAsArray(arrayOfFiveNumberSummaries) {
    let data = [];
    for(let i=0; i<arrayOfFiveNumberSummaries.length; i++) {
      let fiveNumberSummary = arrayOfFiveNumberSummaries[i];
      let dataPoint = {
        x:i + 1,
        open:fiveNumberSummary['q1'],
        close:fiveNumberSummary['q3'],
        low: fiveNumberSummary['min'],
        high: fiveNumberSummary['max']
      };
      data.push(dataPoint);
    }
    return data;
  }

  handleInitialLoad() {
    let heights = 0;
    if(this.state.showHeight === true) {
      heights = PageVizTree.getHeightForObject(this.state.trees);
    } else {
      heights = PageVizTree.getDbhsForObject(this.state.trees);
    }

    let fiveNumberSummaries = [];
    let fiveNumberSummary = PageVizTree.getFiveNumberSummary(heights);
    fiveNumberSummaries.push(fiveNumberSummary);
    let data = PageVizTree.formatBoxPlotDataAsArray(fiveNumberSummaries)

    return data;
  }

  getData() {
    if(!this.state.allData) {
      return this.handleInitialLoad();
    }

    let fiveNumberSummaries = [];
    let heights = 0;
    let data;

    for(let i=0; i<this.state.currentSelectedSites.length; i++) {
      let siteAndTime = this.state.currentSelectedSites[i];
      let treeData = this.state.allData[siteAndTime[0]]['measurements'][siteAndTime[1]]['trees'];
      if(this.state.showHeight === true) {
        heights = PageVizTree.getHeightForObject(treeData);
      } else {
        heights = PageVizTree.getDbhsForObject(treeData);
      }
      let fiveNumberSummary = PageVizTree.getFiveNumberSummary(heights);
      fiveNumberSummaries.push(fiveNumberSummary);
      data = PageVizTree.formatBoxPlotDataAsArray(fiveNumberSummaries);
    }

    return data;
  }

  addToListOfSelectedData(listOfSelectedData) {
    let wholeList = this.state.currentSelectedSites.concat(listOfSelectedData);
    let newList = [];
    for(let i=0; i<wholeList.length; i++) {
      let canAdd = true;

      for(let j=0; j<newList.length; j++) {
        if(newList[j][0] === wholeList[i][0] && newList[j][1] === wholeList[i][1]) {
          canAdd = false;
        }
      }

      if(canAdd) {
        newList.push(wholeList[i]);
      }
    }
    this.setState({currentSelectedSites: newList});
  }

  removeFromListOfSelectedData(data) {
    let selectedData = this.state.currentSelectedSites;
    if(selectedData.length === 1) {
      return;
    }
    for(let i=0; i<selectedData.length; i++) {
      if(selectedData[i][0] === data[0] && selectedData[i][1] === data[1]) {
        selectedData.splice(i, 1);
      }
    }

    this.setState({currentSelectedSites: selectedData});
  }

  render() {
    return (
      <Content contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
        <Text style={styles.fieldLabel}>Select legend: </Text>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue, showHeight: !this.state.showHeight})}
          style={styles.fieldInputDropdown}>
          <Picker.Item label="Height" value="height" />
          <Picker.Item label="DBHS" value="dbhs" />
        </Picker>
        <View style={{backgroundColor:"white", flex:1, alignItems:'center'}}>
          <ChartComponent data={this.getData()}/>
        </View>
        <SitePickerComponent
          currentSelectedSites={this.state.currentSelectedSites}
          onConfirm = {this.addToListOfSelectedData}
          onCancel = {this.removeFromListOfSelectedData}
        />
      </Content>
    )
  }
}
