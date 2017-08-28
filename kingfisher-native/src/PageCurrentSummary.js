import React from 'react';
import { StyleSheet, Text, View, Image, ART, LayoutAnimation, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Svg, { Circle, Rect, Axis } from 'react-native-svg'
import { styles } from "./Styles"
import GreenButton from "./GreenButton"
import Title from "./Title"
import Field from "./Field"
import * as d3 from "d3";

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

export default class PageCurrentSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      length: 100,
      width: 100,
      section: 0,
      species: 0,
      threshold: 0,
      recorder: 0,
      date: 0,
    };
  }



  render () {
    const margin = 5;
    const x = 100;
    const y = 100;

    const dataset = [
                      [ 5,     20 ],
                      [ 480,   90 ],
                      [ 250,   50 ],
                      [ 100,   33 ],
                      [ 330,   95 ],
                      [ 410,   12 ],
                      [ 475,   44 ],
                      [ 25,    67 ],
                      [ 85,    21 ],
                      [ 220,   88 ]
                  ];

    var arc = d3.arc()
                  .innerRadius(10)
                  .outerRadius(20)
                  .startAngle(0)
                  .endAngle(2 * Math.PI);

    console.log(arc());
    console.log(Dimensions.get('window').width);
    console.log(Dimensions.get('window').height);

    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={stylesVisualization.containerMain}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'powderblue'
        }}>
            <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}>
              <Surface width={100} height={100}>
                <Shape
                  d={arc()}
                  stroke="#000"
                  strokeWidth={4}/>
              </Surface>
            </View>
        </View>
      </View>
    )
  }
}


const stylesVisualization = StyleSheet.create({
    containerMain: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#2196F3'
    },

    container: {
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },

    button: {
        backgroundColor: '#2196F3',
    },

    buttonView: {
        padding: 40,
    },

    centeredContainer: {
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
    },
});
