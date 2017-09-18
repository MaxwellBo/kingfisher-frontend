import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import * as firebase from 'firebase';

interface State {
  name: string;
  email: string;
  occupation: string;
}

interface Props {}

export default class PurchaseForm extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      occupation: '',
    };
  }

  handleChangeName(event: any) {
    this.setState({name: event.target.value});
  }

  handleChangeEmail(event: any) {
    this.setState({email: event.target.value});
  }

  handleChangeOccupation(event: any) {
    this.setState({occupation: event.target.value});
  }

  writeFormData() {
    const visitor = {
      name: this.state.name,
      email: this.state.email,
      occupation: this.state.occupation,
      date: new Date(),
    };
    console.log(visitor);
    firebase.database().ref('visitors').push().set(visitor);
  }

  render() {
    return (
      <div className="purchaseForm">
        <section className="hero is-info is-medium">
          <div className="hero-head">
            <header className="nav">
              <div className="container">
                <div className="nav-left">
                  <a className="nav-item">
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
                  <a href="https://api.uqcloud.net/login/http://deco3801-jquery-only.uqcloud.net/stats" className="nav-item">
                    Statistics
                  </a>
                  <a className="nav-item">
                    Documentation
                  </a>
                </div>
              </div>
            </header>
          </div>
        </section>
        <section className="section">
          <div className="form-row">
            <span className="field-label">Name</span>
            <input type="text" className="field" value={this.state.name} onChange={this.handleChangeName.bind(this)} />
          </div>
          <div className="form-row">
            <span className="field-label">Email</span>
            <input type="text" className="field"value={this.state.email} onChange={this.handleChangeEmail.bind(this)} />
          </div>
          <div className="form-row">
            <span className="field-label">Occupation</span>
            <input type="text" className="field"value={this.state.occupation} onChange={this.handleChangeOccupation.bind(this)} />
          </div>
          <div className="form-row">
            <div className="button" onClick={this.writeFormData.bind(this)}>
              Submit
            </div>
          </div>
        </section>
      </div>
    );
  }
}