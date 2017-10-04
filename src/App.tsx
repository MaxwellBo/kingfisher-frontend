import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import * as firebase from 'firebase';
import Nav from './Nav';

import './Bulma.css';
import './App.css';

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
import Stats from './Stats';
import PurchaseForm from './PurchaseForm';
import Footer from './Footer';
import Tabs from './Tabs';

interface CardProps { 
  title: string;
  subtitle: string;
  content: string;
  imgSrc: string;
  imgAlt: string;
}

function Card(cardProps: CardProps) {
  return (
    <div className="card centered">
      <div className="card-image-container">
        <figure className="image is-4by3">
          <img className="card-image" src={cardProps.imgSrc} alt={cardProps.imgAlt} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{cardProps.title}</p>
            <p className="subtitle is-6">{cardProps.subtitle}</p>
          </div>
        </div>
    
        <div className="content">
          {cardProps.content}
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <section className="hero is-info is-medium">
        <div className="hero-head">
          <Nav/>
        </div>
      
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title title-underlined">
              Kingfisher
            </h1>
            <h2 className="subtitle subtitle-underlined">
              Accessible data collection software.
            </h2>
          </div>
        </div>
    
      </section>
      <section className="section">
        <div className="columns is-8">
          <div className="column">
            <Card 
              title="Instant Backups." 
              subtitle=""
              content={
                'Kingfisher will automatically sync all your data to the database as soon as you get online. ' +
                'We make sure to never get in the way of your data. Seamless. Easy.'
              }
              imgSrc="images/titleCard1.png"
              imgAlt="Instant Backups"
            />
          </div>
          <div className="column">
            <Card
              title="Go Paperless."
              subtitle=""
              content={
                'Kingfisher gives you the freedom of paper forms, with the convenience and power of ' +
                'electronic data collection. Transitioning to Kingfisher is a breeze.'
              }
              imgSrc="images/titleCard2.png"
              imgAlt="Go Paperless"
            />
          </div>
          <div className="column">
            <Card
              title="Visualise Data. Anywhere."
              subtitle=""
              content={
                'Our software allows you to store historic data right on your phone, so you can ' +
                'keep tabs on your past data and compare measurements without an internet connection.'
              }
              imgSrc="images/titleCard3.png"
              imgAlt="Visualise Data Anywhere"
            />
          </div>
        </div>
      </section>
      <section className="section centered">
        <h1 className="title">
          Product Video
        </h1>
        <div className="centered">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/oZc_jrutGrk" />
        </div>
      </section>
      <section className="section centered">
        <h1 className="title">
          Features
        </h1>
        <p>
          <ul>
            <li><i className="fa fa-check" aria-hidden="true"/> 
              Automatically sync data with a centralised database of all tree measurements.
            </li>
            <li><i className="fa fa-check" aria-hidden="true"/> 
              Visualise and compare data, online or offline.
            </li>
            <li><i className="fa fa-check" aria-hidden="true"/> 
              Easy to use collection interface.
            </li>
            <li><i className="fa fa-check" aria-hidden="true"/> 
              Automatic geolocation when creating sites or tree measurements.
            </li>
            <li><i className="fa fa-check" aria-hidden="true"/>
              Get notified when the data you've collected is statistically significant enough to stop.
            </li>
          </ul>
        </p>
      </section>
      <section className="section centered">
        <h1 className="title">
          Why Use Kingfisher?
        </h1>
        <p className="column is-three-quarters centered">
          Kingfisher's many features can help streamline the data collection process for your organisation. The 
          app removes the need to manually transfer data into a spreadsheet or database, and will save you tons 
          of time doing collection or data entry alike. Not only that, but it's super safe, and you have no need
          to worry about losing your data between the site and the office. Everything is backed up on your phone 
          until you get internet, and then it syncs with the database!
        </p>
      </section>
    </div>
  );
}

interface Props { }
interface State { }

class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/app" component={Tabs}/>
        <Route exact={true} path="/app/export" component={Export}/>
        <Route exact={true} path="/login" component={Login}/>
        <Route exact={true} path="/tos" component={TOS}/>
        <Route exact={true} path="/stats" component={Stats}/>
        <Route exact={true} path="/purchase" component={PurchaseForm}/>
        <Route path="/" component={Footer}/>
      </div>
    );
  }
}

export default App;
