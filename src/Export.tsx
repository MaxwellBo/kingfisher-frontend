import * as React from 'react';
import * as firebase from 'firebase';
import Dropdown from 'react-dropdown';

import Select from 'react-select';

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

interface Props { }
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
      site: '',
      record: '',
      records: {},
    };
  }

  componentDidMount() {
    this.state.sitesRef.on('value', (sites) => {
      if (sites) {
        this.setState({ sites: sites.val() });
      }
    });
  }

  componentWillUnmount() {
    this.state.sitesRef.off();
  }

  handleWriteUserDataClick = () => {
    writeUserData();
  }

  changeSite = (val) => {
    this.setState({
      site: val.value,
    });

    firebase.database().ref('sites').child(val.value).child('measurements').once('value', (records) => {
      if (records) {
        this.setState({ records: records.val() });
      }
    });
  }

  changeRecord = (val) => {
    this.setState({ record: val.value });
  }

  exportSite = () => {
    this.state.sitesRef
      .child(this.state.site)
      .child('measurements')
      .child(this.state.record)
      .once('value', (record) => {
        if (record) {
          let trees = record.val().trees;
          let csv = 'key,species,height,dbhs\n';
          for (let key in trees) {
            if (trees.hasOwnProperty(key)) {
              csv += key + ',' + trees[key].species + ',' + trees[key].height + ',' + trees[key].dbhs + '\n';
            }
          }
          var link = document.createElement('a');
          link.setAttribute('target', '_blank');

          if (Blob !== undefined) {
            var blob = new Blob([csv], { type: 'text/plain' });
            link.setAttribute('href', URL.createObjectURL(blob));
          } else {
            link.setAttribute('href', 'data:text/plain,' + encodeURIComponent(csv));
          }
          link.setAttribute('download', this.state.site + '_' + this.state.record + '_export.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
  }

  render() {
    // options should be a list of all the site keys
    const siteOptions = (this.state.sites == null) ? [] : Object.keys(this.state.sites).map(key => { 
      return { value: key, label: key }; 
    });

    const recordOptions = (this.state.records == null) ? [] : Object.keys(this.state.records).map(key => { 
      return { value: key, label: key };
    });

    const recordSelect = (recordOptions.length === 0 ?
      (
        <Select
          disabled={true}
          value="Please select a valid site"
          clearable={false}
        />
      ) :
      (
        <Select
          name="record-select"
          onChange={this.changeRecord}
          value={this.state.record}
          options={recordOptions}
          clearable={false}
        />
      ));

    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">Export Data</h1>
          <h2 className="subtitle has-text-centered">
            Select a site record to download the data as a Comma Separated Value (CSV) file.
          </h2>
          <div className="field">
            <label className="label">Select Site</label>
            <Select
              name="site-select"
              value={this.state.site}
              options={siteOptions}
              onChange={this.changeSite}
              clearable={false}
            />
          </div>
          <div className="field">
            <label className="label">Select Record</label>
            {recordSelect}
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" onClick={this.exportSite}>Export</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Export;
