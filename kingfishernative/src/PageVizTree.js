import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { styles } from "./Styles"
import Title from "./Title"
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
export default class PageVizTree extends React.Component {
  constructor(props) {
    super(props);

    // Fuckin hell
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

  render() {
    const { trees } = this.state;

    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    return (
      <Content contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
        <View>
          <Text style={styles.pageHeadTitle}>Visualize Site Data</Text>
          <Text style={styles.pageHeadDesc}>Use this page to view your historical data for this site and analyze your current data.</Text>
        </View>
      </Content>
    )
  }
}
