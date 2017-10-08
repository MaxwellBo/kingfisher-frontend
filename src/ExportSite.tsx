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
  exportsCollapsed: boolean;
}

export default class ExportSite extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      records: {},
      siteRef: firebase.database().ref('sites').child(props.code).child('measurements'),
      exportsCollapsed: true,
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
    var link = document.createElement("a");
    link.setAttribute("target","_blank");
    if(Blob !== undefined) {
        var blob = new Blob([csv], {type: "text/plain"});
        link.setAttribute("href", URL.createObjectURL(blob));
    } else {
        link.setAttribute("href","data:text/plain," + encodeURIComponent(csv));
    }
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }

  exportData = (date: string) => {
    this.state.siteRef.child(date).once('value', (record) => {
      if (record) {
        let trees = record.val()["trees"];
        let csv = "key,dbhs,height,species\n";
        for (let key in trees) {
          if (trees.hasOwnProperty(key)) {
            csv += key + "," + trees[key]["dbhs"] + "," + trees[key]["height"] + "," + trees[key]["species"] + "\n";
          }
        }
        var link = document.createElement("a");
        link.setAttribute("target","_blank");
        if(Blob !== undefined) {
            var blob = new Blob([csv], {type: "text/plain"});
            link.setAttribute("href", URL.createObjectURL(blob));
        } else {
            link.setAttribute("href","data:text/plain," + encodeURIComponent(csv));
        }
        link.setAttribute("download", date + "_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    })
  }

  toggleExports = () => {
      this.setState({exportsCollapsed: !this.state.exportsCollapsed});
  }

  render() {
    let siteRecords = (this.state.records == null || this.state.exportsCollapsed) ? <div/> : Object.keys(this.state.records).map(date => 
      <div className="export-button-cont">
        <button className="button export-button" key={date} onClick={() => this.exportData(date)}>
          Export {date} to CSV
        </button>
      </div>
    )
    return (
      <div className='export-site'>
        <h1 className='title'>
          {this.props.code}
          <button className="button expand-button" onClick={() => this.toggleExports()}>
            {this.state.exportsCollapsed ? 
              <i className="fa fa-plus" aria-hidden="true"></i> : 
              <i className="fa fa-minus" aria-hidden="true"></i>}
          </button>
        </h1>
        <div className='collapsable-exports'>
          {siteRecords}
        </div>
      </div>
    )
  }
}