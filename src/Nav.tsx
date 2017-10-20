import * as React from 'react';

export default class Nav extends React.PureComponent {
  render() {
    return (
      <div className="hero-head">
        <nav className="navbar">
          <div className="navbar-brand is-transparent">
            <a href="/" className="navbar-item">
              <img src="images/kingfisher_logo_text.png" alt="Kingfisher" />
            </a>
            <a className="navbar-item" href="https://www.facebook.com/Kingfisher-127569781308370/">
              <i className="fa fa-facebook-official" aria-hidden="true"/>
            </a>
            <a className="navbar-item" href="https://twitter.com/KingfisherData">
              <i className="fa fa-twitter-square" aria-hidden="true"/>
            </a>
            <a className="navbar-item" href="https://www.instagram.com/kingfisherdata/">
              <i className="fa fa-instagram" aria-hidden="true"/>
            </a>

            <a href="/purchase" className="navbar-item">
              Purchase
            </a>
            <a 
              href="https://api.uqcloud.net/login/http://deco3801-jquery-only.uqcloud.net/stats" 
              className="navbar-item"
            >
              Statistics
            </a>
          </div>
        </nav>
      </div>
    );
  }
}