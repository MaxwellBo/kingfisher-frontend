import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { Link, Route } from 'react-router-native'
import { styles } from "./Styles"
import Title from "./Title"
import LinkButton from "./LinkButton"
import { fbi } from "./Global"
import PageSiteTrees from "./PageSiteTrees"
import PageAddTree from "./PageAddTree"
import AccordionViewSite from "./AccordionViewSite"
import Field from "./Field"

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
    <View style={styles.scroller}>
      <ScrollView 
        contentContainerStyle={[styles.pageCont]}
        >
        <View>
          <Text style={styles.pageHeadTitle}>Sites</Text>
          <Text style={styles.pageHeadDesc}>Add a new site record to get started.</Text>
          <AddSite/>
        </View>
        <View style={styles.sites}>
          
          {sitesComponents}
        </View>
      </ScrollView>
    </View>
  );
}

class AddSite extends React.Component {
  constructor() {
    super();
    this.state = {
      newSiteCode: "nocode"
    }
    this.changeNewSiteCode = this.changeNewSiteCode.bind(this);
    this.addNewSite = this.addNewSite.bind(this);
  }

  changeNewSiteCode(spec, code) {
    obj = {}
    obj[spec] = code
    this.setState(obj);
  }
  
  addNewSite() {
    // ref is a handler for a data entry in firebase

    const ref = fbi.database().ref("sites").child(this.state.newSiteCode);
    // Absolutely disgusting hack. Setting the new site entry to an empty string
    // prevents any database entries appearing as tree records, while still pushing
    // "enough" stuff that it creates a new entry. It's the only way.
    // - Hugo
    ref.set("");

    ref.keepSynced(true);
  }

  render() {
    return (
      <View style={styles.siteAddCont}>
        <Field
          name="newSiteCode"
          extraStyles={styles.siteAddField}
          onChangeText={(spec, code) => this.changeNewSiteCode(spec, code)}
          />
        <TouchableHighlight
          onPress={this.addNewSite}
          accessibilityLabel="Add New Site"
          style={styles.siteAddButton}
          >
          <Text style={{fontSize: 20, textAlign: "center"}}>+</Text>
        </TouchableHighlight>
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
      <View>
        <Route path="/sites" render={TitleComponent} />
        <Route exact path="/sites/:siteCode/:date" component={PageSiteTrees} />
        <Route exact path="/sites/:siteCode/:date/add" component={PageAddTree} />
        <Route exact path="/sites" render={SitesComponent} />
      </View>
    );
  }
}