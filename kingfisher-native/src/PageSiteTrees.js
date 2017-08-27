import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "./Styles"
import Title from "./Title"
import GreenButton from "./GreenButton"
import SiteTreesItem from "./SiteTreesItem"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is a view of all the tree measurements taken for a particular site.
 */
export default class PageSiteTrees extends React.Component {
  render() {
    let treeList = [ // TODO: Remove this default test list and implement real treeList
      <SiteTreesItem key="1" treeName="Tree 1" />,
      <SiteTreesItem key="2" treeName="Tree 2" />
    ]
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
            {treeList}
          </View>
        </View>
      </View>
    )
  }
}