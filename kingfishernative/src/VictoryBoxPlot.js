import React from 'react';
import { G, Line, Rect } from 'react-native-svg'
import {StyleSheet, Text, View, TouchableHighlight, ART} from 'react-native';


PLOT_COLORS = {};
PLOT_COLORS.names = {
  green: "#04dcff",
  gold: "#ffd700",
  fuchsia: "#ff00bd",
  indigo: "#91a3ff",
  lime: "#00ff00",
  magenta: "#ff00ff",
  olive: "#808000",
  orange: "#ffa500",
  purple: "#5dff7c",
  violet: "#e5804a",
  red: "#835cff",
  yellow: "#ffff00"
};

// The box plot which renders the visualisations for site data.
export default class VictoryBoxPlot extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      propDump: this.props
    }
  }

  render() {
    let colors = Object.keys(PLOT_COLORS['names']);
    let colorName = colors[this.props.index];
    let colorId = PLOT_COLORS['names'][colorName];
    let padding = this.props.padding.left || this.props.padding;
    let wickWidth = 0.5 * (this.props.width - 2 * padding) / this.props.data.length;

    return(
    <G {...this.props.events}>
      <Line
        x1={this.props.x}
        y1={this.props.y1}
        x2={this.props.x}
        y2={this.props.y2}
        stroke={colorId}
        strokeWidth="5"
      />
      <Line
        x1={this.props.x + wickWidth/2}
        y1={this.props.y1}
        x2={this.props.x - wickWidth/2}
        y2={this.props.y1}
        stroke={colorId}
        strokeWidth="5"
      />
      <Line
        x1={this.props.x + wickWidth/2}
        y1={this.props.y2}
        x2={this.props.x - wickWidth/2}
        y2={this.props.y2}
        stroke={colorId}
        strokeWidth="5"
      />
      <Rect
        x={this.props.x - wickWidth/2}
        y={this.props.y}
        width={wickWidth}
        height={this.props.candleHeight}
        fill={colorId}
        onClick={()=>console.log("Hi")}
      />
    </G>
    )
  }
}