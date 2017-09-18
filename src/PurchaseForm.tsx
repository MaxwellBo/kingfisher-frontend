import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import * as firebase from 'firebase';

function writeVisitorData() {
  // TODO: get cookie data
  firebase.database().ref('visitors/').child('TODO').set({});
}

export default class PurchaseForm extends React.Component {
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
      </div>
    )
  }
}