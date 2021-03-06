import * as React from 'react';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { Link } from 'react-router-dom';
import 'firebaseui/dist/firebaseui.css';

// Must declare state and props even if they are empty
interface State { }
interface Props { }

// Get the authUI from firebase
const authUi = new firebaseui.auth.AuthUI(firebase.auth());
firebase.auth().onAuthStateChanged(authStateChangedCallback);

var user: firebase.User | null = null;

function authStateChangedCallback(u: firebase.User) {
  user = u;
}

// The login page component.
class Login extends React.Component<Props, State> {
  componentWillUnmount() {
    authUi.reset();
  }

  componentDidMount() {
    var uiConfig = {
      signInSuccessUrl: '/app/export',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      tosUrl: '/tos`'
    };

    if (!user) {
      authUi.start('#Login-firebaseui-auth-container', uiConfig);
    }
  }

  render() {
    if (user) {
      // authUi.reset(); // You might need to do this
      return (
        <section className="section">
          <div className="container">
            <div className="centered-container centered">
              <p>
                You're already logged in!
                <div className="download-button">
                  <Link to="/app/view"><button className="button is-primary">Go to app</button></Link>
                </div>
              </p>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className="section">
          <div className="container">
            <div id="Login-firebaseui-auth-container" />
          </div>
        </section>
      );
    }
  }
}

export default Login;