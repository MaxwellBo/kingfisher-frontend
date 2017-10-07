import React from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
import { Route } from 'react-router-native'
import { styles } from "./Styles"
import Title from "./Title"
import { fbi } from "./Global"
import PageSiteTrees from "./PageSiteTrees"
import PageAddTree from "./PageAddTree"
import AccordionViewSite from "./AccordionViewSite"
import Field from "./Field"
import PageVizTree from "./PageVizTree"

/**
 * Returns a single "site" button.
 *
 * @param props
 *    The values passed in from the XML tag that creates this object
 *
 *    Fields
 *    code - The value for the name of this button
 *
 * @returns {XML}
 */
function Site(props) {
  const { code } = props;

  return (
    <AccordionViewSite
      to={"/sites/" + code} 
      siteCode={code}
      buttonText={"Site " + code} 
      key={code} 
    />
  );
}

/**
 * Builds the XML will will contain the header and all the buttons
 *
 * @param props
 *  Fields:
 *    sites - A dictionary with the XML for the sites
 * @returns {XML}
 * @constructor
 */
function Sites(props) {
  const { sites } = props;

  // Construct a button for every single site on record
  const sitesComponents = (sites == null) ? <View/> : Object.keys(sites).map(key =>
    <Site code={key} key={key} /> //TODO: make site background different if empty i.e no key
  );

  return (
    <Content contentContainerStyle={styles.pageCont}>
      <View>
        <Text style={styles.pageHeadTitle}>Sites</Text>
        <Text style={styles.pageHeadDesc}>Add a new site record to get started.</Text>
        <AddSite/>
      </View>
      <View style={styles.sites}>
        
        {sitesComponents}
      </View>
    </Content>
  );
}

class AddSite extends React.Component {
  constructor() {
    super();
    this.state = {
      newSiteCode: "",
    }
  }

  changeNewSiteCode = (spec, code) => {
    obj = {}
    obj[spec] = code
    this.setState(obj);
  }
  
  addNewSite = () => {
    if (this.state.newSiteCode !== "") {
      const ref = fbi.database().ref("sites").child(this.state.newSiteCode);
      ref.keepSynced(true);

      navigator.geolocation.requestAuthorization();

      navigator.geolocation.getCurrentPosition(
        (position) => {
          ref.set(position.coords);
          this.state.newSiteCode = ""; // only reset field when ref is set
        },
        (error) => {},
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
  }

  render() {
    return (
      <View>
        <View style={styles.siteAddCont}>
          <Field
            name="newSiteCode"
            extraStyles={styles.siteAddField}
            onChangeText={this.changeNewSiteCode}
            />
          <TouchableHighlight
            onPress={this.addNewSite}
            accessibilityLabel="Add New Site"
            style={styles.siteAddButton}
            >
            <Text style={{fontSize: 20, textAlign: "center"}}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default class PageSites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sites: {},
      // TODO: find out if we can retrieve a JSON one layer deep
      sitesRef: fbi.database().ref("sites")
    }
    this.state.sitesRef.keepSynced(true);
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
      <Container>
        <Route path="/sites" render={TitleComponent} />
        <Route exact path="/sites/:siteCode/:date" component={PageSiteTrees} />
        <Route exact path="/sites/:siteCode/:date/add" component={PageAddTree} />
        <Route exact path="/sites/:siteCode/:date/viz" component={PageVizTree} />
        <Route exact path="/sites/:siteCode/:date/edit/:treeName" component={PageAddTree} />
        <Route exact path="/sites" render={SitesComponent} />
      </Container>
    );
  }
}