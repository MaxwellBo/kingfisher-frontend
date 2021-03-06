///<reference path="../node_modules/@types/react/index.d.ts"/>
import * as React from 'react';
import * as firebase from 'firebase';
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
  heightSelected: boolean;
}

// The main component for the View page. Allows users to visualise data
// for sites.
class VisMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sitesRef: firebase.database().ref().child('sites'),
      data: {},
      sites: {},
      mounted: false,
      selected: '',
      heightSelected: true
    };
  }

  // add your listeners into here
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
    {/* only render data viz components if JSON has been pulled from firebase*/}
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
              {/*the drop down site selector*/}
              <Select
                name="form-field-name"
                value={this.state.selected}
                options={options}
                onChange={(val) => this.setState({ selected: val.value })}
                clearable={false}
              />
              {/*render the drop down measurement selector*/}
              <Select
                name="select-dbhs-or-height"
                value={this.state.heightSelected ? "height" : "dbhs"}
                options={[{value:'dbhs', label:'dbhs'}, {value:'height', label:'height'}]}
                onChange={(val) => {
                  console.log(val);
                  val.value === 'height' ? this.setState({ heightSelected: true }) : this.setState({heightSelected:false});
                }}
                clearable={false}
              />
            </div>
            {/*render the data visualisation component*/}
            <Plot
              data={data}
              selected={selected}
              width={700}
              height={700}
              heightSelected={this.state.heightSelected}
            />
          </section>
        </section>
      );
    } else {
      {/* display empty container*/}
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
