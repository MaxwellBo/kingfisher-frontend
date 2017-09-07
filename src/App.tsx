import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import * as firebase from 'firebase';

import './App.css';
import './Bulma.css';

var firebaseConfig = {
  apiKey: 'AIzaSyA2orh7KUcjyaVp44lm59Wq_nSkydEPK3c',
  authDomain: 'kingfisher-ac989.firebaseapp.com',
  databaseURL: 'https://kingfisher-ac989.firebaseio.com',
  projectId: 'kingfisher-ac989',
  storageBucket: 'kingfisher-ac989.appspot.com',
  messagingSenderId: '768313055672'
};

firebase.initializeApp(firebaseConfig);

// XXX: Login must be imported after firebase has been init'd
import Export from './Export';
import Login from './Login';
import TOS from './TOS';

interface Props { }
interface State { }

function Nav() {
  return (
    <div className="tabs">
      <ul>
        <Link to="/export"><li><a>Export</a></li></Link>
        {/* <Link to="/export"><li className="is-active"><a>Export</a></li></Link> */}
        <Link to="/login"><li><a>Login</a></li></Link>
        <Link to="/tos"><li><a>Terms of Service</a></li></Link>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            TODO: License
          </p>
        </div>
      </div>
    </footer>
  );
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        <Route path="/export" component={Export}/>
        <Route path="/login" component={Login}/>
        <Route path="/tos" component={TOS}/>
        <Footer />
      </div>
    );
  }
}

export default App;
