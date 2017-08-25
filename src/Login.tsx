import * as React from 'react';

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

interface State {}
interface Props {}

const authUi = new firebaseui.auth.AuthUI(firebase.auth());

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

      authUi.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div id="firebaseui-auth-container" />
    );
  }
}

export default Login;