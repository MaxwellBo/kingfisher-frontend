import * as React from 'react';
import * as firebase from 'firebase';
import Nav from './Nav';
import any = jasmine.any;
import { PieChart, LineChart } from 'react-easy-chart';

interface Props { }
interface State {
  visitors: Map<String, Visitor>;
  visitorsRef: firebase.database.Reference;
}

interface Visitor {
  date: string;
  email: string;
  name: string;
  occupation: string;
}

function getPieData(visitors: Map<String, Visitor>) {
    let data = {};
    Object.keys(visitors).map(key => {
      let occupation = visitors[key].occupation;
      if (occupation in data) {
        data[occupation] += 1;
      } else {
        data[occupation] = 1;
      }
    });

    return Object.keys(data).map(key => { 
      return {'key': key, 'value': data[key] };
    });
}

function getTimelineData(visitors: Map<String, Visitor>) {
  let data = {};

  Object.keys(visitors).map(key => {
    let date = visitors[key].date;
    if (date in data) {
      data[date] += 1;
    } else {
      data[date] = 1;
    }
  });

  const parsed = Object.keys(data).map(key => { 
    return { x: key, y: data[key] };
  });

  interface Data {
    x: string;
    y: string;
  }

  parsed.sort(function (a: Data, b: Data) {
    var x = a.x;
    var y = b.y;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });

  return parsed;
}

function getEoiToday(visitors: Map<String, Visitor>) {
  var today = new Date();

  let dates: Array<String> = [];
  let count = 0;
  for (const key of Object.keys(visitors)) {
    let date = visitors[key].date;
    var arr = date.split('-');
    let todayDate = '' + today.getDate();
    let todayMonth = '' + today.getMonth();
    let todayYear = '' + today.getFullYear();

    if (arr[0] === todayDate && arr[1] === todayMonth && arr[2] === todayYear) {
      count += 1;
    }
  }

  return count;
}

class Stats extends React.Component<Props, State> {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      visitors: {} as Map<String, Visitor>,
      visitorsRef: firebase.database().ref('visitors')
    };
  }

  componentWillMount() {
    const getCookiebyName = (name: String) => {
      var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
      return !!pair ? pair[1] : null;
    };

    if (getCookiebyName('EAIT_WEB') === null) {
      this.context.router.history.push('/');
    }

  }
  componentDidMount() {
    this.state.visitorsRef.on('value', (visitors) => {
      if (visitors) {
        this.setState({ visitors: visitors.val() });
      }
    });
  }

  componentWillUnmount() {
    this.state.visitorsRef.off();
  }

  render() {
    const { visitors } = this.state;
    let recentEOIs = (visitors == null) ? [<div key="1" />] : Object.keys(visitors).map(key =>
      (
      <div className="rowRecent" key={key}>
        <div className="columns">
          <div className="column">
            {visitors[key].name}
          </div>
          <div className="column">
            {visitors[key].email}
          </div>
          <div className="column">
            {visitors[key].occupation}
          </div>
          <div className="column">
            {visitors[key].date}
          </div>
        </div>
      </div>
      )
    );

    recentEOIs.reverse();
    recentEOIs.length = 10; // Chop the most recent 10 EOIs

    let pieData = getPieData(visitors);
    let lineData = getTimelineData(visitors);
    let count = getEoiToday(visitors);

    return (
      <div className="stats">
        <div className="hero-head">
          <Nav />
        </div>
        <section className="section">
          <div className="container">
            <h1 className="title">Statistics</h1>
            <h2 className="subtitle">
              Details on Expressions of Interest
            </h2>
            <div className="columns">
              <div className="column is-half centered">
                <div className="centered big-text"><strong>EOIs Today: {count}</strong></div>
              </div>
              <div className="column is-half centered">
                <div>
                  <PieChart
                    labels={true}
                    data={pieData}
                  />
                  <div className="centered"><strong>Interest by Occupation</strong></div>
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
              axes={true}
              grid={true}
              verticalGrid={true}
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
