import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from "./Styles"

import PageIndex from "./PageIndex"
import PageSiteHome from "./PageSiteHome"
import PageSiteTrees from "./PageSiteTrees"
import PageSiteSpec from "./PageSiteSpec"
import PageAddTree from "./PageAddTree"

/*
 * AppScreen takes the role of rendering the page given to it by App.
 */
export default class AppScreen extends React.Component {
  constructor() {
    super();
  }
  
  // Renders a different Page depending on the user's interactions.
  // The page to be rendered is gotten from App (the root component).
  // Pages must be passed the following props:
  //  - changepage (should be `(pageName) => this.props.changePage(pageName)`)
  //  - goBack (should be `() => this.props.goBack()`)
  //  - OPTIONAL titleInfo (for pages with the title header. Should be `this.props.titleInfo`)
  render() {
    let currentPage = <View/>;
    switch (this.props.currentPage) {
      case "index":
        currentPage = (
          <PageIndex changePage={(pageName) => this.props.changePage(pageName)} />
        )
        break;
      case "login":
        break;
      case "map":
        break;
      case "siteHome": // Choose what to add to the site (trees, densitometer, review)
        currentPage = (
          <PageSiteHome
            titleInfo={this.props.titleInfo}
            goBack={() => this.props.goBack()}
            changePage={(pageName) => this.props.changePage(pageName)} />
        )
        break;
      case "siteSpec":
        currentPage = (
          <PageSiteSpec
            titleInfo={this.props.titleInfo}
            goBack={() => this.props.goBack()}
            changePage={(pageName) => this.props.changePage(pageName)} />
        )
        break;
      case "siteTrees":
        currentPage = (
          <PageSiteTrees
            titleInfo={this.props.titleInfo}
            goBack={() => this.props.goBack()}
            changePage={(pageName) => this.props.changePage(pageName)} />
        )
        break;
      case "siteTreeStat":
        break;
      case "addTree":
        currentPage = (
          <PageAddTree
            titleInfo={this.props.titleInfo}
            goBack={() => this.props.goBack()}
            changePage={(pageName) => this.props.changePage(pageName)} /> 
        )
        break;
      case "treeCounter":
        break;
      case "siteHistory":
        break;
      case "settings":
        break;
      default:
        currentPage = <Text>Yall fucked it</Text>
        // Index screen
    };

    return (
      <View>
        {currentPage}
      </View>
    );
  }
}