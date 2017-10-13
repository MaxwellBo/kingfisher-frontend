///<reference path="../node_modules/@types/react/index.d.ts"/>
import * as React from 'react';
import * as firebase from 'firebase';
import ViewSiteCard from './ViewSiteCard';
import {withFauxDOM, ReactFauxDOM} from 'react-faux-dom';
import {isNumber} from "util";
import * as d3 from 'd3'
import Plot from "./Plot";

interface Props {}

interface State {
  sitesRef: firebase.database.Reference;
  data: {};
  sites: {};
  mounted: boolean;
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
  componentWillMount() {
    // Pulls JSON from the firebase
    this.state.sitesRef.on('value', (snap) => {
      if (snap) {
        this.setState({
          data: snap.val(),
        });
        this.setState({mounted: true});
      }
    });
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
            mounted: true,
          });
          this.setState({mounted: true});
      }
    });
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
  getAverageTreeHeights(siteName: string, allData: object) {
    let returnString = '';
    let siteData = allData[siteName];
    let datesKey = 'measurements';
    let measurementKey = 'trees';
    let heightKey = 'height';
    let siteVisitDates = siteData[datesKey];
    let avgHeight = 0;
    let dateCount = 0;
    // iterate through all measurement dates
    // console.log(siteName);
    for (var date in siteVisitDates) {
      let measurements = siteVisitDates[date][measurementKey];
      let treeCount = 1;
      let sumHeight = 0;
      for (var treeNo in measurements) {
        sumHeight += parseFloat(measurements[treeNo][heightKey]);
        treeCount++;
      }
      // TODO Clean this up
      avgHeight = Math.round((sumHeight / treeCount) / 10);
      if (dateCount === 0) {
        returnString = returnString.concat((avgHeight*10).toString() + '{');
      }
      returnString = returnString.concat(avgHeight.toString() + ',');
      dateCount++;
    }
    returnString = returnString.substring(0, returnString.length - 1)
      + '}' + (avgHeight*10).toString();
    // console.log(returnString);

    return returnString;
  }

  render() {
    let allData = this.state.data;

    if (this.state.mounted) {
      let siteCards = (this.state.data == null) ? <div/> :
        Object.keys(this.state.data).map((siteName) =>
          (
            <ViewSiteCard
              key={siteName}
              title={siteName.toString()}
              data={this.getAverageTreeHeights(siteName, allData)}
            />
          )
        );
      return (
        <section className="section has-text-centered">
          <div className="container">
            <div className="title">
              {'Historical Average Tree Heights'}
            </div>
            <div className="title">
              {siteCards}
            </div>
          </div>
          <Plot data={this.state.data}/>
        </section>
      );
    } else {
      return (
        <div className="has-text-centered">
          <p className="title loading-message">
            {'Loading your data...'}
          </p>
        </div>
      );
    }
  }
}

export default VisMenu;
