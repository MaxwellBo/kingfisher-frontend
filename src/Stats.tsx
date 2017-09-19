import * as React from 'react';
import * as firebase from 'firebase';
import Nav from "./Nav";
import any = jasmine.any;
import {PieChart, LineChart} from 'react-easy-chart';

function writeVisitorData() {

  const getCookiebyName = (name: String) => {
    var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return !!pair ? pair[1] : null;
  };

  firebase.database().ref('visitors').child('TODO').set({});
}

interface Props {}
interface State {
  visitors: {};
  visitorsRef: firebase.database.Reference;
}

class Stats extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visitors: {},
      visitorsRef: firebase.database().ref('visitors')
    };
  }

  componentDidMount() {
    this.state.visitorsRef.on('value', (visitors) => {
      if (visitors) {
        this.setState({visitors: visitors.val()});
      }
    });
  }

  componentWillUnmount() {
    this.state.visitorsRef.off();
  }

  getPieData(visitors: any) {
    let data = {};
    for(let key in visitors) {
      let occupation = visitors[key]['occupation'];
      if(occupation in data) {
        data[occupation] += 1;
      } else {
        data[occupation] = 1;
      }
    }
    console.log(data)
      let parsable_data:any = []
      for(let key in data) {
      let log:any = {'key':key, 'value':data[key]}
        parsable_data.push(log)
      }
      console.log(parsable_data)
    return parsable_data
  }

  getTimelineData(visitors: any) {
      let data = {};
      for(let key in visitors) {
          let occupation = visitors[key]['date'];
          if(occupation in data) {
              data[occupation] += 1;
          } else {
              data[occupation] = 1;
          }
      }
      console.log("timelinedata")
      console.log(data)
      console.log("timelinedata")

      let parsable_data:any = []
      for(let key in data) {
          let log:any = {'x':key, 'y':data[key]}
          parsable_data.push(log)
      }

      parsable_data.sort(function(a:any, b:any) {
          var x = a['x'];
          var y = b['x'];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
      return parsable_data
  }

  render() {
    const { visitors } = this.state;
  let recentEOIs = (visitors == null) ? [<div key="1"/>] : Object.keys(visitors).map(key =>
      (<div className="rowRecent" key={key}>
        <div className="columns">
          <div className="column">
            {visitors[key]['name']}
          </div>
          <div className="column">
            {visitors[key]['email']}
          </div>
          <div className="column">
            {visitors[key]['occupation']}
          </div>
          <div className="column">
            {visitors[key]['date']}
          </div>
        </div>
      </div>)
    )

    recentEOIs.reverse();
    recentEOIs.length = 10 // Chop the most recent 10 EOIs

      let pieData = this.getPieData(visitors)
      let lineData = this.getTimelineData(visitors)

    return (
      <div className="stats">
        <div className="hero-head">
          <Nav/>
        </div>
        <section className="section">
          <div className="container">
            <h1 className="title">Statistics</h1>
            <h2 className="subtitle">
              Details on Expressions of Interest
            </h2>
            <div className="columns">
              <div className="column is-half centered">
                <p className="centered">Interest by Occupation</p>
              </div>
              <div className="column is-half centered">
                <p className="centered">EOIs Today</p>
                <div>
                  <PieChart
                      labels
                      data={pieData}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">Interest Over Time</h1>
            <LineChart
                xType={'text'}
                axes
                grid
                verticalGrid
                interpolate={'cardinal'}
                width={750}
                height={250}
                data={[lineData]}
            />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">Recent EOIs</h1>
            <div className="rowRecent">
              <div className="columns">
                <div className="column">
                  <strong>Name</strong>
                </div>
                <div className="column">
                  <strong>Email</strong>
                </div>
                <div className="column">
                  <strong>Occupation</strong>
                </div>
                <div className="column">
                  <strong>Date</strong>
                </div>
              </div>
            </div>
            {recentEOIs}
          </div>
        </section>
        
      </div>
    );
  }
}

export default Stats;
