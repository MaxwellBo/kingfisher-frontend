import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {Container, Content, Button, Left, Right, Icon, Text, Picker} from 'native-base';
import { styles } from "./Styles"
import { fbi } from "./Global"
import { VictoryAxis, VictoryChart, VictoryCandlestick, VictoryLabel } from "victory-native";
import VictoryBoxPlot from "./VictoryBoxPlot"
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
      treesRef: fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees'),
      showHeight: true,
      textInputValue: '',
      currentSelectedSites: [[this.props.match.params.siteCode, this.props.match.params.date]]
    };

    this.state.treesRef.keepSynced(true);

    this.addToListOfSelectedData = this.addToListOfSelectedData.bind(this);
    this.removeFromListOfSelectedData = this.removeFromListOfSelectedData.bind(this);
  }

  componentDidMount() {
    this.state.treesRef
      .on('value', (trees) => {
        if (trees) {
          this.setState({ trees: trees.val() });
        }
      });
  }

  componentWillUnmount() {
    this.state.treesRef.off();
  }

  static getHeight(allData) {
    let heights = [];
    for (let key in allData) {
      if (allData.hasOwnProperty(key)) {
        heights.push(allData[key]['height']);
      }
    }
    return heights;
  }

  static getDbhs(allData) {
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
      let dataPoint = {x:i + 1,
        open:fiveNumberSummary['q1'],
        close:fiveNumberSummary['q3'],
        low: fiveNumberSummary['min'],
        high: fiveNumberSummary['max']
      };
      data.push(dataPoint);
    }
    return data;
  }

  getData() {
    let data = [];

    if(this.state.showHeight === true) {
      let heights = PageVizTree.getHeight(this.state.trees);
      let fiveNumberSummaries = [];
      let fiveNumberSummary = PageVizTree.getFiveNumberSummary(heights);
      fiveNumberSummaries.push(fiveNumberSummary);
      data = PageVizTree.formatBoxPlotDataAsArray(fiveNumberSummaries);
    } else {
      let heights = PageVizTree.getDbhs(this.state.trees);
      let fiveNumberSummaries = [];
      let fiveNumberSummary = PageVizTree.getFiveNumberSummary(heights);
      fiveNumberSummaries.push(fiveNumberSummary);
      data = PageVizTree.formatBoxPlotDataAsArray(fiveNumberSummaries)
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

    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Some date' },
    ];

    return (
      <Content contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue, showHeight: !this.state.showHeight})}
          style={{backgroundColor:"gray"}}>
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
