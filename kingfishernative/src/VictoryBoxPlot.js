import React from 'react';
import { G, Line, Rect } from 'react-native-svg'
import {StyleSheet, Text, View, TouchableHighlight, ART} from 'react-native';


PLOT_COLORS = {};
PLOT_COLORS.names = {
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkviolet: "#9400d3",
  fuchsia: "#ff00ff",
  gold: "#ffd700",
  green: "#008000",
  indigo: "#4b0082",
  lime: "#00ff00",
  magenta: "#ff00ff",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  orange: "#ffa500",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  yellow: "#ffff00"
};

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

    console.log(this.props);

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