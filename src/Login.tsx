import * as React from 'react';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

declare const authUi: firebaseui.auth.AuthUI;

class Login extends React.Component<{}, {}> {
   componentWillUnmount() {
       authUi.reset();
   }

  componentDidMount() {
      var uiConfig = {
        signInSuccessUrl: '/app', 
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      authUi.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div id="firebaseui-auth-container" />
    );
  }
}

export default Login;