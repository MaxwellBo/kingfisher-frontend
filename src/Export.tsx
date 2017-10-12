import * as React from 'react';
import * as firebase from 'firebase';
import Dropdown from "react-dropdown";

import ExportSite from './ExportSite';
import MapWithAMarkerCluster from './Map';

function writeUserData() {
  const user = firebase.auth().currentUser;

  if (user) {
    firebase.database().ref('users/' + user.uid).set({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email
    });
  }
}

interface Props {}
interface State {
  sites: {};
  sitesRef: firebase.database.Reference;
  site: string;
  record: string;
  records: {};
}

class Export extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sites: {},
      sitesRef: firebase.database().ref('sites'),
      site: "",
      record: "",
      records: {},
    };
  }

  componentDidMount() {
    this.state.sitesRef.on('value', (sites) => {
      if (sites) {
        this.setState({sites: sites.val()});
      }
    });
  }

  componentWillUnmount() {
    this.state.sitesRef.off();
  }

  handleWriteUserDataClick = () => {
    writeUserData();
  }

  changeSite = (event) => {
    this.setState({
      site: event.target.value,
    });

    firebase.database().ref('sites').child(event.target.value).child("measurements").once('value', (records) => {
      if (records) {
        this.setState({records: records.val()});
      }
    });
    console.log(this.state);
  }

  changeRecord = (event) => {
    this.setState({record: event.target.value});
  }

  render() {
    const siteComponents = (this.state.sites == null) ? <div/> : Object.keys(this.state.sites).map(key =>
      <ExportSite key={key} code={key} /> 
    );
    // options should be a list of all the site keys
    const siteOptions = (this.state.sites == null) ? [] : Object.keys(this.state.sites).map(key => 
      <option value={key}>{key}</option>
    );

    const recordOptions = (this.state.records == null) ? [] : Object.keys(this.state.records).map(key => 
      <option value={key}>{key}</option>
    );

    console.log(recordOptions.length == 0);

    const recordSelect = (recordOptions.length == 0 ?
    (
      <select disabled>
        <option value="Please select valid site">Please select valid site</option>
      </select>
    ) :
    (
      <select onChange={this.changeRecord}>
        {recordOptions}
      </select>
    ))

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Export Data</h1>
          <h2 className="subtitle">
            Click on a site record to download the data as a Comma Separated Value (CSV) file.
          </h2>
          {siteComponents}
          <select onChange={this.changeSite}>
            {siteOptions}
          </select>
          {recordSelect}
          <MapWithAMarkerCluster />
        </div>
      </section>
    );
  }
}

export default Export;
