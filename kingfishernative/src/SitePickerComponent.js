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
    let measurements = []
    for(let i=0; i<sites.length; i++) {
      let siteName = sites[i];
      measurements = this.state.trees[siteName]['measurements'];
      if(measurements === undefined) {
        continue;
      } else {
        let measurementKeys = Object.keys(measurements);
        measurementKeys.map((measurementName) => sitesAndDates.push([siteName, measurementName]))
      }
    }
    return sitesAndDates;
  }


  render() {
    let selectedLabels = this.state.currentSelectedSites.map((siteNameAndDate) =>
      <LabelSelect.Label>
        {siteNameAndDate}
      </LabelSelect.Label>)

    let sitesAndDates = this.getOtherSelectedSitesAndDates();

    let unselectedLabels = sitesAndDates.map((sitesAndDates) =>
      <LabelSelect.ModalItem>
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
        title="Make Choices"
        enable={true}
        readOnly={false}
        enableAddBtn={true}
      >

        {selectedLabels}
        {unselectedLabels}
      </LabelSelect>
    )
  }
}