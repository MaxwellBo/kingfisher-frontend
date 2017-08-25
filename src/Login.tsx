import * as React from 'react';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

interface State {}
interface Props {}

const authUi = new firebaseui.auth.AuthUI(firebase.auth());
firebase.auth().onAuthStateChanged(authStateChangedCallback);

var user: firebase.User | null = null;

function authStateChangedCallback(u: firebase.User) {
  user = u;
}

class Login extends React.Component<Props, State> {
   componentWillUnmount() {
    authUi.reset();
   }

  componentDidMount() {
      var uiConfig = {
        signInSuccessUrl: '/export', 
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        tosUrl: '<your-tos-url>'
      };

      if (!user) {
        authUi.start('#Login-firebaseui-auth-container', uiConfig);
      }
  }

  render() {
    if (user) {
      // authUi.reset(); // You might need to do this
      return (<div id="Login-info"><p>You're already logged in!</p></div>);
    } else {
      return (<div id="Login-firebaseui-auth-container" />);
    }
  }
}

export default Login;