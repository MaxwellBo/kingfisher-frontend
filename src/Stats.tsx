import * as React from 'react';
import * as firebase from 'firebase';
import {PieChart, LineChart} from 'react-easy-chart';
import any = jasmine.any;

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

  render() {
    const { visitors } = this.state;
    let recentEOIs = (visitors == null) ? <div/> : Object.keys(visitors).map(key =>
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
        </div>
      </div>)
    )

      let pieData = this.getPieData(visitors)

    return (
      <div className="stats">
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
                xType={'time'}
                axes
                grid
                verticalGrid
                interpolate={'cardinal'}
                width={750}
                height={250}
                data={[
                    [
                        { x: '1-Jan-15', y: 20 },
                        { x: '1-Feb-15', y: 10 },
                        { x: '1-Mar-15', y: 33 },
                        { x: '1-Apr-15', y: 45 },
                        { x: '1-May-15', y: 15 }
                    ], [
                        { x: '1-Jan-15', y: 10 },
                        { x: '1-Feb-15', y: 15 },
                        { x: '1-Mar-15', y: 13 },
                        { x: '1-Apr-15', y: 15 },
                        { x: '1-May-15', y: 10 }
                    ]
                ]}
            />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1 className="title">Recent EOIs</h1>
            <div className="rowRecent">
              <div className="columns">
                <div className="column">
                  Name
                </div>
                <div className="column">
                  Email
                </div>
                <div className="column">
                  Occupation
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
