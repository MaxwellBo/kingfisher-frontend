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

interface CardProps { 
  title: string;
  subtitle: string;
  content: string;
}

function Card(cardProps: CardProps) {
  return (
    <div className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src="http://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-4">{cardProps.title}</p>
          <p className="subtitle is-6">{cardProps.subtitle}</p>
        </div>
      </div>
  
      <div className="content">
        {cardProps.content}<a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br />
      </div>
    </div>
  </div>
  );
}

function Home() {
  return (
    <section className="hero is-primary is-medium">
    <div className="hero-head">
      <header className="nav">
        <div className="container">
          <div className="nav-left">
            <a className="nav-item">
              <img src="images/bulma-type-white.png" alt="Logo" />
            </a>
          </div>
          <span className="nav-toggle">
            {/* <span></span>
            <span></span>
            <span></span> */}
          </span>
          <div className="nav-right nav-menu">
            {/* <a className="nav-item is-active"> */}
            <a className="nav-item is-active">
              Home
            </a>
            <a className="nav-item">
              Examples
            </a>
            <a className="nav-item">
              Documentation
            </a>
            <span className="nav-item">
              <Link to="/login">
                <a className="button is-primary is-inverted">
                  <span className="icon">
                    <i className="fa fa-lock" />
                  </span>
                  <span>Login</span>
                </a>
              </Link>
            </span>
          </div>
        </div>
      </header>
    </div>
  
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">
          Title
        </h1>
        <h2 className="subtitle">
          Subtitle
        </h2>
      </div>
    </div>
  
    <div className="hero-foot">
      <nav className="tabs">
        <div className="container">
          <ul>
            <li className="is-active"><a>Overview</a></li>
            <li><a>Modifiers</a></li>
            <li><a>Grid</a></li>
            <li><a>Elements</a></li>
            <li><a>Components</a></li>
            <li><a>Layout</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
  );
}

function Nav() {
  return (
    <div className="tabs">
      <ul>
        <Link to="/app/export"><li><a>Export</a></li></Link>
        {/* <Link to="/export"><li className="is-active"><a>Export</a></li></Link> */}
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

interface Props { }
interface State { }

class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/app" component={Nav}/>
        <Route exact={true} path="/app/export" component={Export}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/tos" component={TOS}/>
        <Route path="/app" component={Footer}/>
      </div>
    );
  }
}

export default App;
