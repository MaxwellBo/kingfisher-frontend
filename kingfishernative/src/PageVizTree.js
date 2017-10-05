import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {Container, Content, Button, Left, Right, Icon, Text, Picker} from 'native-base';
import { styles } from "./Styles"
import { fbi } from "./Global"
import { VictoryAxis, VictoryChart, VictoryCandlestick, VictoryLabel } from "victory-native";
import VictoryBoxPlot from "./VictoryBoxPlot"
import LabelSelect from 'react-native-label-select';
import SitePickerComponent from "./SitePickerComponent";
// import SitePickerComponent.js from './SitePickerComponent.js'

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

  /** {
   *     num: 17,
   *     sum: 731,
   *     avg: 43,
   *
   *     min: 3,
   *     q1: 23.25,
   *     median: 38,
   *     q3: 68.5,
   *     max: 92
   * }
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

  render() {

    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Some date' },
    ];

    return (
      <Content contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
        <View>
          <Text style={styles.pageHeadTitle}>Visualize Site Data</Text>
          <Text style={styles.pageHeadDesc}>
            Use this page to view your historical data for this site and analyze your current data.
          </Text>
        </View>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue, showHeight: !this.state.showHeight})}
          style={{backgroundColor:"gray"}}>
          <Picker.Item label="Height" value="height" />
          <Picker.Item label="DBHS" value="dbhs" />
        </Picker>
        <SitePickerComponent
          currentSelectedSites={this.state.currentSelectedSites}
        />
        <View style={{backgroundColor:"white", flex:1, alignItems:'center'}}>
          <VictoryChart
            style={{
              parent: {
                border: "1px solid #ccc"
              }
            }}
            height={300}
            width={300}
          >
            <VictoryAxis
               width={300}
               height={300}
               domain={[0, this.getData().length + 1]}
               standalone={false}
               fixLabelOverlap={false}
               style={{
                 axis: {stroke: "#756f6a"},
                 axisLabel: {fontSize: 20, padding: 30},
                 grid: {stroke: (t) => "grey"},
                 ticks: {stroke: "grey", size: 5},
                 tickLabels: {fontSize: 15, padding: 5}
               }}
               tickLabelComponent={<VictoryLabel dy={15}/>}
            />
            <VictoryAxis
               width={300}
               height={300}
               standalone={false}
               dependentAxis={true}
               fixLabelOverlap={false}
               style={{
                 axis: {stroke: "#2c3e50"},
                 axisLabel: {fontSize: 20, padding: 30},
                 grid: {stroke: (t) => "grey"},
                 ticks: {stroke: "grey", size: 5},
                 tickLabels: {fontSize: 15, padding: 5}
               }}
               tickCount={5}
               tickLabelComponent={<VictoryLabel dx={-3} dy={15}/>}
            />
            <VictoryCandlestick
              data={this.getData()}
              dataComponent={<VictoryBoxPlot />}
            />
          </VictoryChart>
        </View>
      </Content>
    )
  }
}
