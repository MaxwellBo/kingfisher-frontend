import React from 'react';
import { StyleSheet, View, ScrollView, Picker } from 'react-native';
import { Container, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { styles } from "./Styles"
import Title from "./Title"
import LinkButton from "./LinkButton"
import SiteTreesItem from "./SiteTreesItem"
import { fbi } from "./Global"
import AccordionViewTree from "./AccordionViewTree"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryCandlestick, VictoryLabel, Candle } from "victory-native";
import VictoryBoxPlot from "./VictoryBoxPlot"


/**
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen.
 *
 * This page is a view of all the tree measurements taken for a particular site.
 */
export default class PageVizTree extends React.Component {
  constructor(props) {
    super(props);

    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    this.state = {
      trees: {},
      treesRef: fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees')
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

  getHeight(allData) {
    let heights = []
    for (let key in allData) {
      if (allData.hasOwnProperty(key)) {
        heights.push(allData[key]['height']);
      }
    }
    return heights;
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
  getFiveNumberSummary(dataAsArray) {
    let ss = require('summary-statistics');
    let summary = ss(dataAsArray);
    return summary;
  }

  formatBoxPlotDataAsArray(arrayOfFiveNumberSummaries) {
    let data = []
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

  render() {
    const { trees } = this.state;

    const siteCode = this.props.match.params.siteCode;
    const date = this.props.match.params.date;

    let heights = this.getHeight(trees)
    let fiveNumberSummaries = []
    let fiveNumberSummary = this.getFiveNumberSummary(heights)
    console.log(fiveNumberSummary)
    fiveNumberSummaries.push(fiveNumberSummary)
    let data = this.formatBoxPlotDataAsArray(fiveNumberSummaries)
    console.log(data);

    return (
      <Content contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
        <View>
          <Text style={styles.pageHeadTitle}>Visualize Site Data</Text>
          <Text style={styles.pageHeadDesc}>Use this page to view your historical data for this site and analyze your current data.</Text>
        </View>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
          style={{backgroundColor:"gray"}}>
          <Picker.Item label="Height" value="height" />
          <Picker.Item label="DBHS" value="dbhs" />
        </Picker>
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
               domain={[0, data.length + 1]}
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
               domain={[200, 400]}
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
              data={data}
              dataComponent={<VictoryBoxPlot />}
            />
          </VictoryChart>
        </View>
      </Content>
    )
  }
}
