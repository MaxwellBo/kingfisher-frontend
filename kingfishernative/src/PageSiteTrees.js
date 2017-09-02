import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "./Styles"
import Title from "./Title"
import GreenButton from "./GreenButton"
import SiteTreesItem from "./SiteTreesItem"
import { fbi } from "./Global"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is a view of all the tree measurements taken for a particular site.
 */
export default class PageSiteTrees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      treeList: {},
    };

    const ref = fbi.database().ref(this.props.activeSite).child('trees');
    ref
      .on('value', (trees) => {
        this.setState({treeList: trees.val()});
      });
  }

  render() {
    const { treeList } = this.state;

    const treeComponents = Object.keys(treeList).map(key => {
      <SiteTreesItem key={key} treeName={key} />
    });

    return (
      <View>
        <Title
          titleInfo={"Tree Records for\nSite " + this.props.activeSite}
          goBack={() => this.props.goBack()}
        />
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
            <GreenButton
              buttonText="Count"
              pageName="treeCounter"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
            <GreenButton
              buttonText="Finish"
              pageName="siteHome"
              changePage={(pageName) => this.props.changePage(pageName)}
            />
          </View>
          <View style={styles.treeList}>
            {treeComponents}
          </View>
        </View>
      </View>
    )
  }
}