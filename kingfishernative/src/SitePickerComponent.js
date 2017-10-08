import LabelSelect from 'react-native-label-select';
import React from 'react';
import { fbi } from "./Global";
import {Container, Content, Button, Left, Right, Icon, Text, Picker} from 'native-base';

export default class SitePickerComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedSites: this.props.currentSelectedSites,
      treesRef: fbi.database().ref("sites"),
      trees: {}
    };
    // treesRef: fbi.database().ref("sites").child(siteCode).child("measurements").child(date).child('trees'),
  }

  componentWillReceiveProps(props) {
    this.setState({currentSelectedSites: props.currentSelectedSites})
  }

  componentDidMount() {
    this.state.treesRef.on('value', (trees) => {
        if (trees) {
          this.setState({ trees: trees.val() });
        }
      });
  }

  getOtherSelectedSitesAndDates() {
    let sites = Object.keys(this.state.trees);
    let sitesAndDates = [];

    // Populate the sitesAndDates with ALL the site and date combinations in the database
    for(let i=0; i<sites.length; i++) {
      let siteName = sites[i];
      let measurements = this.state.trees[siteName]['measurements'];
      if(measurements === undefined) {
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
    let selectedLabels = this.state.currentSelectedSites.map((siteNameAndDate, index) =>
      <LabelSelect.Label
        onCancel={this.props.onCancel}
        key={index}
        data={siteNameAndDate}
      >
        {siteNameAndDate[0] + " " + siteNameAndDate[1].split("::")[0] + " " + siteNameAndDate[1].split("::")[1]}
      </LabelSelect.Label>)

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