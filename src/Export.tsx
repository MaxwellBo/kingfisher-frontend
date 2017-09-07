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
      <section className="section">
        <div className="container">
          <h1 className="title">Section</h1>
          <h2 className="subtitle">
            A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
        </h2>
        </div>
      </section>
    );
  }
}

export default Export;
