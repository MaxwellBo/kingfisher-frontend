import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Container, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { styles } from "./Styles"
import LinkButton from "./LinkButton"
import SiteTreesItem from "./SiteTreesItem"
import { fbi } from "./Global"
import AccordionViewTree from "./AccordionViewTree"

/**
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is a view of all the tree measurements taken for a particular site.
 */
export default class PageSiteTrees extends React.Component {
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

  chunk (arr, len) {

    var chunks = [],
      i = 0,
      n = arr.length;

    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }

    return chunks;
  }

  getHeightAvg(trees, treeNames) {
    let totalHeight = 0;
    for(let i=0; i<treeNames.length; i++) {
      totalHeight += parseInt(trees[treeNames[i]]['height']);
    }
    let avgHeight = totalHeight/treeNames.length;
    return avgHeight;
  }

  splitIntoSetsOf10() {
    let trees = this.state.trees;
    let treeNames = Object.keys(trees);
    /*
    if(!(treeNames.length % 10 === 0 && treeNames.length > 10)) {
      return;
    }
    */

    if(!treeNames) {
      return;
    }
    let treeGroups = this.chunk(treeNames, 4);
    if(!treeGroups[0]) {
      return;
    }
    let lastChunkAverage = this.getHeightAvg(trees, treeGroups[treeGroups.length - 1]);
    for(let i=0; i<treeGroups.length - 1; i++) {
      if(!treeGroups[i]) {
        continue;
      }
      let comparisonChunk = this.getHeightAvg(trees, treeGroups[i]);
      let diff = Math.abs(lastChunkAverage - comparisonChunk) / comparisonChunk * 100;
      if (diff < 2) {
        Alert.alert(
          "You're done!"
        )
        return;
      }
    }
  }


  deleteTree = (treeID) => {
    this.state.treesRef.child(treeID).remove();
  }

  render() {
    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    const { trees } = this.state;
    const treesComponents = (trees == null) ? <View/> : Object.keys(trees).map(key =>
      <AccordionViewTree
        treeName={key}
        key={key}
        species={trees[key]['species']}
        height={trees[key]['height']}
        dbhs={trees[key]['dbhs']}
        siteCode={siteCode}
        date={date}
        deleteTree={this.deleteTree}
      />
    );

    this.splitIntoSetsOf10();

    return (
      <Content contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
        <View>
          <Text style={styles.pageHeadTitle}>Site Tree Records</Text>
          <Text style={styles.pageHeadDesc}>Add new trees, view trees input this session, and save data input session.</Text>
        </View>
        <View style={[styles.horizontalFlexCont]}>
          <LinkButton
            buttonText="Add"
            to={"/sites/" + siteCode + "/" + date + "/add"} 
          />
          <LinkButton
            buttonText="Visualize"
            to={"/sites/" + siteCode + "/" + date + "/viz"}
          />
        </View>
        <View style={styles.trees}>
          {treesComponents}
        </View>
      </Content>
    )
  }
}
