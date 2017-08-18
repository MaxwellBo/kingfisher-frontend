import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import './App.css';
import Export from './Export';
import Login from './Login';

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
          <Link to="/login">Login</Link>
        </nav>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Route path="/export" component={Export}/>
        <Route path="/login" component={Login}/>
      </div>
    );
  }
}

export default App;

var config = {
  apiKey: 'AIzaSyA2orh7KUcjyaVp44lm59Wq_nSkydEPK3c',
  authDomain: 'kingfisher-ac989.firebaseapp.com',
  databaseURL: 'https://kingfisher-ac989.firebaseio.com',
  projectId: 'kingfisher-ac989',
  storageBucket: 'kingfisher-ac989.appspot.com',
  messagingSenderId: '768313055672'
};

firebase.initializeApp(config);
const authUi = new firebaseui.auth.AuthUI(firebase.auth());