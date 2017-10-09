///<reference path="../node_modules/@types/react/index.d.ts"/>
import * as React from 'react';
import * as firebase from 'firebase';

import ViewSiteCard from "./ViewSiteCard";
import {isNumber} from "util";

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
            sites: Array(Object.keys(snap.val()).length),
          });
      }
    });
    this.setState({mounted: true});
  }

  componentWillUnmount() {
      this.state.sitesRef.off();
  }

  /**
   * Do data processing here
   * @require: Data in sites have a measurements
   * with the following structure:
   *  date {
   *    trees {
   *      treeNo {
   *        dbhs {
   *          dbhNo
   *        }
   *        height
   *        species
   *      }
   *    }
   *  }
   */
  getAverageTreeHeights(siteName, allData) {
    let returnString = "";
    let siteData = allData[siteName];
    let siteVisitDates = siteData['measurements'];
    let avgHeight = 0;
    let dateCount = 0;
    // iterate through all measurement dates
    console.log(siteName);
    for (var date in siteVisitDates) {
      let measurements = siteVisitDates[date]['trees'];
      let treeCount = 1;
      let sumHeight = 0;
      for (var treeNo in measurements) {
        sumHeight += parseFloat(measurements[treeNo]['height']);
        treeCount++;
      }
      // TODO Clean this up
      avgHeight = Math.round((sumHeight/treeCount)/10);
      if (dateCount == 0) {
        returnString = returnString.concat(avgHeight.toString() + "{");
      }
      returnString = returnString.concat(avgHeight.toString() + ",");
      dateCount++;
    }
    returnString = returnString.substring(0, returnString.length-1)
      + "}" + avgHeight.toString();
    console.log(returnString);

    return returnString;
  }

  render() {
    let placeHolder = "{1,1,2,3,5,8,13,21,34,55,89,100,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}";
    let allData = this.state.data;
    //data={this.getSiteData(siteName)}
    if (this.state.mounted) {

      let siteCards = (this.state.data == null) ? <div/> :
        Object.keys(this.state.data).map((siteName) =>
          <ViewSiteCard
            title={siteName.toString()}
            data={this.getAverageTreeHeights(siteName, allData)}
          />
        )
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
