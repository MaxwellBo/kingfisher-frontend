import LabelSelect from 'react-native-label-select';
import React from 'react';
import { fbi } from "./Global";
import {Container, Content, Button, Left, Right, Icon, Text, Picker} from 'native-base';
const {width, height, scale} = window;

PLOT_COLORS = {};
// The list of valid plot colours
PLOT_COLORS.names = {
  green: "#008000",
  gold: "#ffd700",
  fuchsia: "#ff00ff",
  indigo: "#4b0082",
  lime: "#00ff00",
  magenta: "#ff00ff",
  olive: "#808000",
  orange: "#ffa500",
  purple: "#800080",
  violet: "#800080",
  red: "#ff0000",
  yellow: "#ffff00"
};

// A component that allows users to choose which sites to render on the box plot,
// to compare them against each other.
export default class SitePickerComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedSites: this.props.currentSelectedSites,
      treesRef: fbi.database().ref("sites"),
      trees: {}
    };
  }

  componentWillReceiveProps(props) {
    this.setState({currentSelectedSites: props.currentSelectedSites})
  }

  // Turn on a firebase watch and update the state when changes are detected
  // (including the initial data retrieval)
  componentDidMount() {
    this.state.treesRef.on('value', (trees) => {
        if (trees) {
          this.setState({ trees: trees.val() });
        }
      });
  }

  // Turn off the firebase watch so that we don't call setState on
  // an unmounted component.
  componentWillUnmount() {
    this.state.treesRef.off();
  }

  getOtherSelectedSitesAndDates() {
    let sites = Object.keys(this.state.trees);
    let sitesAndDates = [];

    // Populate the sitesAndDates with ALL the site and date combinations in the database
    for(let i=0; i<sites.length; i++) {
      let siteName = sites[i];
      let measurements = this.state.trees[siteName]['measurements'];
      if(measurements === undefined || !(typeof(measurements) === 'object')) {
        continue;
      } else {
        let measurementKeys = Object.keys(measurements);
        measurementKeys.map((measurementName) => sitesAndDates.push([siteName, measurementName]))
      }
    }

    // Remove the sitesAndDates that we have loaded into the currentSitesAndDates
    let uniqueSitesAndDates = [];
    for(let i=0; i<sitesAndDates.length; i++) {
      let canAdd = true;
      for(let j=0; j<this.state.currentSelectedSites.length; j++) {
        if(this.state.currentSelectedSites[j][0] === sitesAndDates[i][0] &&
          this.state.currentSelectedSites[j][1] === sitesAndDates[i][1]
        ) {
          canAdd = false;
        }
      }
      if(canAdd) {
        uniqueSitesAndDates.push(sitesAndDates[i]);
      }
    }

    return uniqueSitesAndDates;
  }


  render() {
    let selectedLabels = this.state.currentSelectedSites.map((siteNameAndDate, index) => {

      let colors = Object.keys(PLOT_COLORS['names']);
      let colorName = colors[index];
      let colorId = PLOT_COLORS['names'][colorName];

      return (
        <LabelSelect.Label
          onCancel={this.props.onCancel}
          key={index}
          data={siteNameAndDate}
          closeStyle={{
            backgroundColor: colorId,
            padding: 8,
            borderLeftWidth: 2 / scale,
            borderLeftColor: colorId
          }}
          labelStyle={{backgroundColor: colorId}}
        >
          {siteNameAndDate[0] + " " + siteNameAndDate[1].split("::")[0] + " " + siteNameAndDate[1].split("::")[1]}
        </LabelSelect.Label>)
    }
  )

    Object.keys(this.state.trees)
    if(!(this.state.trees) || !(typeof(this.state.trees) == 'object')) {
      return (
        <Text></Text>
      )
    }

    let sitesAndDates = this.getOtherSelectedSitesAndDates();

    let unselectedLabels = sitesAndDates.map((sitesAndDates, index) =>
      <LabelSelect.ModalItem
        key={index}
        data={sitesAndDates}
      >
        <Text>{"Site Name: "+ sitesAndDates[0] +
              "\n" +
              "Date: " + sitesAndDates[1].split("::")[0] +
              "\n" +
              "Time: " + sitesAndDates[1].split("::")[1]}
        </Text>
      </LabelSelect.ModalItem>);

    return(
      <LabelSelect
        ref="labelSelect"
        title="Choose sites"
        enable={true}
        readOnly={false}
        enableAddBtn={true}
        onConfirm={this.props.onConfirm}>
      >

        {selectedLabels}
        {unselectedLabels}
      </LabelSelect>
    )
  }
}
