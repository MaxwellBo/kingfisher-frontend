import * as React from 'react';
import * as firebase from 'firebase';

import Select from 'react-select';

interface Props { }
// State contains the site and record to be exported, as well as refs and objects
// that represent these site records.
interface State {
  sites: {};
  sitesRef: firebase.database.Reference;
  site: string;
  record: string;
  records: {};
}

// The main component for the Export page. Allows users to export
// the json data from the firebase database to CSV format.
class Export extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Set the initial state
    this.state = {
      sites: {},
      sitesRef: firebase.database().ref('sites'),
      site: '',
      record: '',
      records: {},
    };
  }

  // Set the sites object in state to the reference from firebase.
  // sitesRef.on() also will update the sites object if the database changes.
  componentDidMount() {
    this.state.sitesRef.on('value', (sites) => {
      if (sites) {
        this.setState({ sites: sites.val() });
      }
    });
  }

  // Turn off the reference if the component will unmount.
  componentWillUnmount() {
    this.state.sitesRef.off();
  }

  // Change the site the dropdown has selected.
  changeSite = (val) => {
    this.setState({
      site: val.value,
    });

    // Grab the value from the sites ref as a snapshot of the database.
    firebase.database().ref('sites').child(val.value).child('measurements').once('value', (records) => {
      if (records) {
        this.setState({ records: records.val() });
      }
    });
  }

  // Change the record the dropdown has selected.
  changeRecord = (val) => {
    this.setState({ record: val.value });
  }

  // Convert the json data to csv and download it.
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

  // Render Export component
  render() {
    // siteoptions should be a list of all the site keys
    const siteOptions = (this.state.sites == null) ? [] : Object.keys(this.state.sites).map(key => { 
      return { value: key, label: key }; 
    });

    // recordOptions is a list of all record times for the selected site.
    const recordOptions = (this.state.records == null) ? [] : Object.keys(this.state.records).map(key => { 
      return { value: key, label: key };
    });

    // Makes the selector for records disabled if no site is chosen, or a site
    // with no records is chosen.
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
