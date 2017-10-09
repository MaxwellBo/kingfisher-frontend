///<reference path="../node_modules/@types/react/index.d.ts"/>
import * as React from 'react';
import * as firebase from 'firebase';

import ViewSiteCard from "./ViewSiteCard";

interface Props {}

interface State {
  sitesRef: firebase.database.Reference;
  data: {},
  sites: {},
  mounted: boolean,
}

class VisMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sitesRef: firebase.database().ref().child('sites'),
      data: {},
      sites: {},
      mounted: false,
    };
  }

  // add your listeners into here
  // use this function to set states once the
  componentDidMount() {
    // Pulls JSON from the firebase
    this.state.sitesRef.on('value', (snap) => {
      if (snap) {
          this.setState({
              data: snap.val(),
          });
      }
    });
    this.setState({mounted: true});
  }

  componentWillUnmount() {
      this.state.sitesRef.off();
  }

  generateSiteCards(allData : Object) {
    console.log(Object.keys(allData));
  }

  boop(siteName: Object) {
    alert(siteName.toString());
  }


  render() {
    //data={this.getSiteData(siteName)}
    if (this.state.mounted) {
      let siteCards = (this.state.data == null) ?
        <div/> : Object.keys(this.state.data).map(siteName =>
          <div className="site-card-cont centered">
            <button className="button" key={siteName}
                    onClick={() => this.boop(siteName)}>
              {siteName}
            </button>
            <ViewSiteCard
              title={siteName.toString()}
              data={"{1,1,2,3,5,8,13,21,34,55,89,100,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}"}
            />
          </div>
        )
      //{this.state.data ? this.generateSiteCards(this.state.data) : "not mounted"}
      return (
        <section className="section has-text-centered">
          <div className="container">
            <div className="title">
              {"Let's visualise some data"}
            </div>
            <div className="title">
              {siteCards}
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <div className="has-text-centered">
          <p className="title load-error">
            {"Well this is embarassing..."}
          </p>
          <p className="subtitle site-card-title">
            {"We're having issues loading your data"}
          </p>
        </div>
      );
    }
  }
}

export default VisMenu;
