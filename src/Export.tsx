import * as React from 'react';
import * as firebase from 'firebase';
import './App.css';

function writeUserData() {
  const user = firebase.auth().currentUser;

  if (user) {
    firebase.database().ref('users/' + user.uid).set({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email
    });
  }
}

class Export extends React.PureComponent<{}, {}> {

  handleWriteUserDataClick = () => {
    writeUserData();
  }

  render() {
    return (
      <div className="Export">
        <p>Export</p>
        <button onClick={this.handleWriteUserDataClick}>Write user data</button>
      </div>
    );
  }
}

export default Export;
