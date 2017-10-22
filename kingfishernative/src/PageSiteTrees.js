import React from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Container, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { styles } from "./Styles"
import LinkButton from "./LinkButton"
import { fbi } from "./Global"
import AccordionViewTree from "./AccordionViewTree"
import SpecialButton from "./SpecialButton"

/**
 * All classes beginning with "Page" are different representations of pages.
 * 
 * This page is a view of all the tree measurements taken for a particular site.
 */
export default class PageSiteTrees extends React.Component {
  constructor(props) {
    super(props);

    // Get the site code and the date of the current site record we're on from
    // the react-router route.
    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    this.state = {
      trees: {},
      // Using the route, get the ref for this site record's trees
      treesRef: fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees')
    };

    this.state.treesRef.keepSynced(true);
  }

  // When the component mounts, get the data from the ref and start watching it
  // for changes. If it changes, update the state.
  componentDidMount() {
    this.state.treesRef
      .on('value', (trees) => {
        if (trees) {
          this.setState({ trees: trees.val() });
        }
      });
  }

  // Turn off the ref's watch. This is so we don't update state on an unmounted component.
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

  // Calculate the mean height for all trees in the site record.
  getHeightAvg(trees, treeNames) {
    let totalHeight = 0;
    for(let i=0; i<treeNames.length; i++) {
      totalHeight += parseInt(trees[treeNames[i]]['height']);
    }
    let avgHeight = totalHeight/treeNames.length;
    return avgHeight;
  }

  // Split the tree measurements into sets of 10 for statistical analysis
  // on the standard deviation of height and DBHs, so that we can inform the
  // user when their data is statistically significant and they can stop recording
  // new tree measurements.
  splitIntoSetsOf10() {
    let trees = this.state.trees;
    let treeNames = trees == null ? [] : Object.keys(trees);
    
    if(!(treeNames.length % 10 === 0 && treeNames.length > 10)) {
      return;
    }

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
          "Data collected is statistically significant. No additional trees need to be recorded."
        )
        return;
      }
    }
  }

  // Deletes a tree from the database.
  deleteTree = (treeID) => {
    this.state.treesRef.child(treeID).remove();
  }

  noVis = () => {
    Alert.alert("Not enough data to visualise.")
  }

  render() {
    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    const { trees } = this.state;
    // If the trees object is null, don't touch it and just render an empty <View />.
    // If it's not null, make accordion views out of each tree in the site record.
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

    const visualiseButton = (trees == null) ?
        <SpecialButton 
          onClick={this.noVis}
          buttonText="Visualize"
        /> :
        <LinkButton
          buttonText="Visualize"
          to={"/sites/" + siteCode + "/" + date + "/viz"}
        />

    // Check if the data is statistically significant before rendering.
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
          {visualiseButton}
        </View>
        <View style={styles.trees}>
          {treesComponents}
        </View>
      </Content>
    )
  }
}
