import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import Export from './Export';

const logo = require('./logo.svg');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <nav>
          <Link to="/export">Dashboard</Link>
        </nav>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Route path="/export" component={Export}/>
      </div>
    );
  }
}

export default App;
