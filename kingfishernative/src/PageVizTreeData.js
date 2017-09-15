import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from "./Styles"
import { VictoryChart, VictoryCandlestick, VictoryTheme, VictoryAxis } from "victory-native";
import { fbi } from "./Global"

export default class PageVizTreeData extends React.Component {
  siteCode;
  date;

  constructor(props) {
    super(props);

    this.siteCode = this.props.match.params.siteCode
    this.date = this.props.match.params.date

    this.state = {
      trees: {},
      treesRef: fbi.database().ref("sites").child(this.siteCode).child(this.date).child('trees')
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

  getData() {
    let dbhs = []
    let allData = this.state.trees;
    let allDataKeys = Object.keys(allData);
    for(let i=0; i<allDataKeys.length; i++) {
      let currentDbhs = allData[allDataKeys[i]]['dbhs'];
      for (let j = 0; j < currentDbhs.length; i++) {
        dbhs.push(currentDbhs[j]);
      }
      console.log(dbhs)
    }
    console.log(dbhs);
  }

  render() {
    this.getData();

    return (
      <View style={[styles.pageCont, styles.siteHome]}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
        >
          <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
          <VictoryAxis dependentAxis/>
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={[{x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
            {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
            {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
            {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
            {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5}
              ]}
          />
        </VictoryChart>
      </View>
    );
  }
}