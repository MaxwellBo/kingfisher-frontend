///<reference path="../node_modules/@types/react/index.d.ts"/>
import * as React from 'react';
import * as firebase from 'firebase';
import ViewSiteCard from './ViewSiteCard';
import { withFauxDOM, ReactFauxDOM } from 'react-faux-dom';
import { isNumber } from 'util';
import * as d3 from 'd3';
import Plot from './Plot';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

interface Props { }

interface State {
  sitesRef: firebase.database.Reference;
  data: {};
  sites: {};
  mounted: boolean;
  selected: string;
}

class VisMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sitesRef: firebase.database().ref().child('sites'),
      data: {},
      sites: {},
      mounted: false,
      selected: ''
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
        this.setState({ mounted: true });
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
        this.setState({ mounted: true });
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
        returnString = returnString.concat((avgHeight * 10).toString() + '{');
      }
      returnString = returnString.concat(avgHeight.toString() + ',');
      dateCount++;
    }
    returnString = returnString.substring(0, returnString.length - 1)
      + '}' + (avgHeight * 10).toString();

    return returnString;
  }

  render() {
    if (this.state.mounted) {
      let siteNames = Object.keys(this.state.data);
      let options = siteNames.map((d) => { 
        return  { value: d, label: d }; 
      });

      let selected = this.state.selected;
      let data = this.state.data;

      return (
        <section className="section has-text-centered view">
          <div className="container">
            <h1 className="title">View Data</h1>
          </div>
          <section className="section">
            <div style={{ width: '30%', margin: '0 auto' }}>
              <Select
                name="form-field-name"
                value={this.state.selected}
                options={options}
                onChange={(val) => this.setState({ selected: val.value })}
                clearable={false}
              />
            </div>
            <Plot
              data={data}
              selected={selected}
              width={700}
              height={700}
            />
          </section>
        </section>
      );
    } else {

      return (
        <section className="section has-text-centered view">
          <div className="container">
            <h1 className="title">View Data</h1>
          </div>
        </section>
      );
    }
  }
}

export default VisMenu;
