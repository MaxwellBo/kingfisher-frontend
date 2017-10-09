import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {Container, Content, Button, Left, Right, Icon, Picker} from 'native-base';
import { VictoryAxis, VictoryChart, VictoryCandlestick, VictoryLabel } from "victory-native";
import VictoryBoxPlot from "./VictoryBoxPlot"
import { G, Line, Rect } from 'react-native-svg'

export default class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <VictoryChart
        style={{
          parent: {
            border: "1px solid #ccc"
          }
        }}
        height={400}
        width={300}
      >
        <VictoryAxis
          width={300}
          height={300}
          domain={[0, this.props.data.length + 1]}
          standalone={false}
          fixLabelOverlap={false}
          style={{
            axis: {stroke: "#756f6a"},
            axisLabel: {fontSize: 20, padding: 30},
            grid: {stroke: (t) => "grey"},
            ticks: {stroke: "grey", size: 5},
            tickLabels: {fontSize: 15, padding: 5}
          }}
          tickLabelComponent={<G/>}
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
          data={this.props.data}
          dataComponent={<VictoryBoxPlot color={"blue"}/>}
        />
      </VictoryChart>
    );
  }
}