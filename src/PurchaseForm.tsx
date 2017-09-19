import * as React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import Nav from "./Nav"

interface State {
  name: string;
  email: string;
  occupation: string;
  submitted: boolean;
}

interface Props {}

export default class PurchaseForm extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      occupation: 'Student',
      submitted: false,
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
    const date = new Date();
    let dateString = ""
    dateString += date.getDate() + "-"
    dateString += date.getMonth() + "-"
    dateString += date.getFullYear()
    const visitor = {
      name: this.state.name,
      email: this.state.email,
      occupation: this.state.occupation,
      date: dateString
    };
    firebase.database().ref('visitors').push().set(visitor);
    this.setState({submitted: true});
  }

  render() {
    if (this.state.submitted) {
      return (
        <div className="purchaseForm">
          <section className="hero is-info is-medium">
            <Nav/>
          </section>
          <section className="section">
            <h1 className="title">
              Thank you!
            </h1>
            <h2 className="subtitle">
              Your response has been recorded.
            </h2>
          </section>
        </div>
      );
    } else {
      return (
        <div className="purchaseForm">
          <section className="hero is-info is-medium">
            <Nav/>
          </section>
          <section className="section centered">
            <h1 className="title">Express Interest</h1>
            <h2 className="subtitle">
              We can't sell you the product right now, but we'll contact you as soon as we can!
            </h2>
            <div className="form centered">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className="input" type="text" value={this.state.name} onChange={this.handleChangeName.bind(this)} placeholder="Text input"/>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="text" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} placeholder="Text input"/>
                </div>
              </div>
              <div className="field">
                <label className="label">Occupation</label>
                <div className="control centered">
                  <div className="select">
                    <select onChange={this.handleChangeOccupation.bind(this)}>
                      <option>Student</option>
                      <option>Teacher</option>
                      <option>Researcher</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row submit">
                <div className="button" onClick={this.writeFormData.bind(this)}>
                  Submit
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}