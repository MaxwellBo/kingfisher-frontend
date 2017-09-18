import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import * as firebase from 'firebase';

function writeVisitorData() {
  // TODO: get cookie data
  firebase.database().ref('visitors/').child('TODO').set({});
}

interface State {
  name: string;
  email: string;
  occupation: string;
}
export default class PurchaseForm extends React.Component<State> {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      occupation: "",
    }
  }

  writeFormData() {
    const visitor = {
      name: this.state.name,
      email: this.state.email,
      occupation: this.state.occupation,
    }
    firebase.database().ref('visitors/').push().set(visitor)
  }


  render() {
    return (
      <div className="purchaseForm">
        <div className="form-row">
          <span className="field-label">Name</span>
          <input type="text" className="field"/>
        </div>
        <div className="form-row">
          <span className="field-label">Email</span>
          <input type="text" className="field"/>
        </div>
        <div className="form-row">
          <span className="field-label">Occupation</span>
          <input type="text" className="field"/>
        </div>
        <div className="form-row">
          <div className="button"  />
        </div>
        
      </div>
    )
  }
}