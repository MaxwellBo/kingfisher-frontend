import * as React from 'react';
import * as firebase from 'firebase';
//import json2csv from 'json-2-csv';
var converter = require('json-2-csv');

interface Props {
  code: string;
}

interface State {
  active: boolean;
  records: {};
  siteRef: firebase.database.Reference;
}

export default class ExportSite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      records: {},
      siteRef: firebase.database().ref('sites').child(props.code).child('measurements'),
    }
  }
  componentDidMount() {
    this.state.siteRef.on('value', (siteRecords) => {
      if (siteRecords) {
        this.setState({records: siteRecords.val()});
      }
    });
  }

  componentWillUnmount() {
    this.state.siteRef.off();
  }

  json2csvCallback = function(err:any, csv:string) {
    if (err) {
      throw err;
    }
    console.log(csv);
  }

  exportData = (date: string) => {
    this.state.siteRef.child(date).once('value', (record) => {
      if (record) {
        converter.json2csv(record.val(), this.json2csvCallback);
      }
    })
  }

  render() {
    let siteRecords = (this.state.records == null) ? <div/> : Object.keys(this.state.records).map(date => 
      <button className="button" key={date} onClick={() => this.exportData(date)}>
        Export {date} to CSV
      </button>
    )
    return (
      <div className='exportSite'>
        {siteRecords}
      </div>
    )
  }
}