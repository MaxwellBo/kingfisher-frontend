import * as React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';

export default class Nav extends React.Component {
  render() {
    return (
      <div className="hero-head">
        <header className="nav">
          <div className="container">
            <div className="nav-left">
              <a href="/" className="nav-item">
                <img src="images/bulma-type-white.png" alt="Kingfisher" />
              </a>
            </div>
            <span className="nav-toggle">
              {/* <span></span>
              <span></span>
              <span></span> */}
            </span>
            <div className="nav-right nav-menu">
              {/* <a className="nav-item is-active"> */}
              <a className="nav-item" href="https://www.facebook.com/Kingfisher-127569781308370/">
                <i className="fa fa-facebook-official" aria-hidden="true"/>
              </a>
              <a className="nav-item" href="https://twitter.com/KingfisherData">
                <i className="fa fa-twitter-square" aria-hidden="true"/>
              </a>
              <a className="nav-item" href="https://www.instagram.com/kingfisherdata/">
                <i className="fa fa-instagram" aria-hidden="true"/>
              </a>

              <a href="/purchase" className="nav-item">
                Purchase
              </a>
              <a 
                href="https://api.uqcloud.net/login/http://deco3801-jquery-only.uqcloud.net/stats" 
                className="nav-item"
              >
                Statistics
              </a>
              <a className="nav-item">
                Documentation
              </a>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

// https://api.uqcloud.net/login/http://deco3801-jquery-only.uqcloud.net/stats