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

    this.state = {
      treeList: {},
      treeRef: fbi.database().ref("sites").child(this.props.activeSite).child('trees')
    };

  }

  componentDidMount() {
    this.state.treeRef
      .on('value', (trees) => {
        this.setState({treeList: trees.val()});
      });
  }

  componentWillUnmount() {
    this.state.treeRef.off();
  }

  render() {
    const { treeList } = this.state;
    const treeComponents = Object.keys(treeList) == {} ? <View/> : Object.keys(treeList).map(key =>
      <AccordionView
        treeName={key}
        key={key}
        species={treeList[key]['species']}
        height={treeList[key]['height']}
        dbhs={treeList[key]['dbhs']}
      />
    );

    return (
      <View>
        <Title
          titleInfo={this.props.location.pathname}
          goBack={() => this.props.history.goBack()}
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