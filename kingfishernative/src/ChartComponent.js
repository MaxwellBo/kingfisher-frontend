import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {Container, Content, Button, Left, Right, Icon, Picker} from 'native-base';
import { VictoryAxis, VictoryChart, VictoryCandlestick, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer } from "victory-native";
import VictoryBoxPlot from "./VictoryBoxPlot"
import { G, Line, Rect, Svg } from 'react-native-svg'

export default class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Svg
        style={{
          parent: {
            border: "1px solid #ccc"
          }
        }}
        height={400}
        width={400}
      >
        <VictoryAxis
          width={400}
          height={400}
          domain={[0, this.props.data.length + 1]}
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
          width={400}
          height={400}
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
          name={"plot"}
          labelComponent={<VictoryTooltip/>}
          labels={(d) => d['open'] ? d['open'] : "Hi"}
          standalone={false}
          height={300}
          width={300}
        />
      </Svg>
    );
  }
}