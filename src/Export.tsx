import * as React from 'react';
import * as firebase from 'firebase';

import ExportSite from "./ExportSite";
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
}

class Export extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sites: {},
      sitesRef: firebase.database().ref('sites')
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

  render() {
    const siteComponents = (this.state.sites == null) ? <div/> : Object.keys(this.state.sites).map(key =>
      <ExportSite key={key} code={key} /> 
    );
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Export Data</h1>
          <h2 className="subtitle">
            Click on a site record to download the data as a Comma Separated Value (CSV) file.
          </h2>
          {siteComponents}
          <MapWithAMarkerCluster />
        </div>
      </section>
    );
  }
}

export default Export;
