import React from 'react';
import { Svg, G, Line } from 'react-native-svg'
import { StyleSheet, Text, View, TouchableHighlight, ART } from 'react-native';
import { styles } from "./Styles"
import { Bar, ErrorBar, Candle } from "victory-native";
import PropTypes from "prop-types";
const {
  Surface,
  Group,
  Shape,
} = ART;



export default class VictoryBoxPlot extends React.Component {
  render() {
    return(
    <G>
      <Line
        x1={this.props.x}
        y1={this.props.y1}
        x2={this.props.x}
        y2={this.props.y2}
        stroke={this.props.color}
        strokeWidth="5"/>
      <Line
        x1={this.props.x + this.props.width/30}
        y1={this.props.y1}
        x2={this.props.x - + this.props.width/30}
        y2={this.props.y1}
        stroke={this.props.color}
        strokeWidth="5"/>
      <Line
        x1={this.props.x + this.props.width/30}
        y1={this.props.y2}
        x2={this.props.x - + this.props.width/30}
        y2={this.props.y2}
        stroke={this.props.color}
        strokeWidth="5"/>
      <Candle {...this.props}
              style={{fill:this.props.color}}
      />
    </G>
    )
  }
}