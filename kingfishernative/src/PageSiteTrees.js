import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
export default class PageSiteTrees extends React.Component {
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
    const treesComponents = (trees == null) ? <View/> : Object.keys(trees).map(key =>
      <AccordionViewTree
        treeName={key}
        key={key}
        species={trees[key]['species']}
        height={trees[key]['height']}
        dbhs={trees[key]['dbhs']}
      />
    );

    const siteCode = this.props.match.params.siteCode
    const date = this.props.match.params.date

    return (
      <View style={styles.scroller}>
        <ScrollView contentContainerStyle={[styles.pageCont, styles.siteTrees]}>
          <View>
            <Text style={styles.pageHeadTitle}>Site Tree Records</Text>
            <Text style={styles.pageHeadDesc}>Add new trees, view trees input this session, and save data input session.</Text>
          </View>
          <View style={[styles.horizontalFlexCont]}>
            <LinkButton
              buttonText="Add"
              to={"/sites/" + siteCode + "/" + date + "/add"} 
            />
          </View>
          <View style={styles.trees}>
            {treesComponents}
          </View>
        </ScrollView>
      </View>
    )
  }
}
