import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "./Styles"
import Title from "./Title"
import GreenButton from "./GreenButton"
import SiteTreesItem from "./SiteTreesItem"
import { fbi } from "./Global"
import AccordionView from "./AccordionView"

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

    this.state = {
      trees: {},
      // TODO: v rename v 
      treesRef: fbi.database().ref("sites").child(siteCode).child('trees')
    };

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
    const treesComponents = Object.keys(trees).map(key =>
      <AccordionView
        treeName={key}
        key={key}
        species={trees[key]['species']}
        height={trees[key]['height']}
        dbhs={trees[key]['dbhs']}
      />
    );

    return (
      <View>
        <View style={[styles.pageCont, styles.siteTrees]}>
          <View>
            <Text style={styles.pageHeadTitle}>Site Tree Records</Text>
            <Text style={styles.pageHeadDesc}>Add new trees, view trees input this session, and save data input session.</Text>
          </View>
          <View style={[styles.horizontalFlexCont]}>
            <GreenButton
              buttonText="Add"
              pageName="addTree"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
          </View>
          <View style={styles.trees}>
            {treesComponents}
          </View>
        </View>
      </View>
    )
  }
}