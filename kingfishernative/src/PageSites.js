import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Route } from 'react-router-native'
import { styles } from "./Styles"
import Title from "./Title"
import LinkButton from "./LinkButton"
import { fbi } from "./Global"
import PageSiteTrees from "./PageSiteTrees"

/*
 * All classes beginning with "Page" are different representations of pages
 * to be rendered by AppScreen. 
 * 
 * This page is the main menu once a site has been selected.
 */

function Site(props) {
  const { code } = props;

  return (
    <LinkButton to={"/sites/" + code} buttonText={code} key={code} />
  );
}

function Sites(props) {
  const { sites } = props;
  const sitesComponents = Object.keys(sites).map(key =>
    <Site code={key} key={key} />
  );

  return (
    <View style={[styles.pageCont, styles.siteHome]}>
      <View>
        <Text style={styles.pageHeadTitle}>Sites</Text>
        <Text style={styles.pageHeadDesc}>Add a new site record to get started.</Text>
      </View>
      <View style={styles.sites}>
        {sitesComponents}
      </View>
    </View>
  );
}

export default class PageSites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sites: {},
      // TODO: find out if we can retrieve a JSON one layer deep
      sitesRef: fbi.database().ref("sites")
    }
  }

  componentDidMount() {
    this.state.sitesRef
      .on('value', (sites) => {
        if (sites) {
          this.setState({ sites: sites.val() });
        }
      });
  }

  componentWillUnmount() {
    this.state.sitesRef.off();
  }

  render() {
    // https://github.com/ReactTraining/react-router/issues/4105
    const TitleComponent = (props) => (
      <Title
        titleInfo={props.location.pathname}
        goBack={() => props.history.goBack()}
      />);

    const SitesComponent = (props) => (
      <Sites sites={this.state.sites} /> 
    )

    return (
      <View>
        <Route path="/sites" render={TitleComponent} />
        <Route exact path="/sites/:siteCode" component={PageSiteTrees} />
        <Route exact path="/sites" render={SitesComponent} />
      </View>
    );
  }
}