import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

import './App.css';
import Export from './Export';
import Login from './Login';

const logo = require('./logo.svg');

var firebaseConfig = {
  apiKey: 'AIzaSyA2orh7KUcjyaVp44lm59Wq_nSkydEPK3c',
  authDomain: 'kingfisher-ac989.firebaseapp.com',
  databaseURL: 'https://kingfisher-ac989.firebaseio.com',
  projectId: 'kingfisher-ac989',
  storageBucket: 'kingfisher-ac989.appspot.com',
  messagingSenderId: '768313055672'
};

firebase.initializeApp(firebaseConfig);

interface Props {}
interface State {
  authUi: firebaseui.auth.AuthUI;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      // FIXME: Not sure that this is idomatic
      authUi: new firebaseui.auth.AuthUI(firebase.auth())
    };
  }

  // FIXME: Get the GitHub link that describes why this exists
  // TODO: Find out whether it's better style to keep this as a class method
  //       or scoped in a module. I'm thinking it's meant to be a class method
  makeLogin = () => {
    return (
      <Login 
        authUi={this.state.authUi}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <nav>
          <Link to="/export">Export</Link>
          <Link to="/login">Login</Link>
        </nav>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Route path="/export" component={Export}/>
        <Route path="/login" render={this.makeLogin}/>
      </div>
    );
  }
}

export default App;
