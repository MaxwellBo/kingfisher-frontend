import LabelSelect from 'react-native-label-select';
import React from 'react';

export default class SitePickerComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedSites: this.props.currentSelectedSites
    };
  }

  render() {

    let selectedLabels = this.state.currentSelectedSites.map((siteNameAndDate) =>
      <LabelSelect.Label>
        {siteNameAndDate}
      </LabelSelect.Label>)

    return(
      <LabelSelect
        ref="labelSelect"
        title="Make Choices"
        enable={true}
        readOnly={false}
        enableAddBtn={true}
      >

        {selectedLabels}
        <LabelSelect.ModalItem>
          Hi
        </LabelSelect.ModalItem>
        <LabelSelect.ModalItem>
          Hi
        </LabelSelect.ModalItem>
      </LabelSelect>
    )
  }
}