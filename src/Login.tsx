import * as React from 'react';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

interface Props {
  authUi: firebaseui.auth.AuthUI;
}
interface State {}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

   componentWillUnmount() {
    this.props.authUi.reset();
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

      this.props.authUi.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div id="firebaseui-auth-container" />
    );
  }
}

export default Login;