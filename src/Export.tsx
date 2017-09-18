import * as React from 'react';
import * as firebase from 'firebase';

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

interface Props {}
interface State {
  sites: {};
  sitesRef: firebase.database.Reference;
}

class Export extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sites: {},
      sitesRef: firebase.database().ref('sites')
    };
  }

  componentDidMount() {
    this.state.sitesRef.on('value', (sites) => {
      if (sites) {
        this.setState({sites: sites.val()});
      }
    });
  }

  componentWillUnmount() {
    this.state.sitesRef.off();
  }

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
        <p>{JSON.stringify(this.state.sites)}</p>
        </div>
      </section>
    );
  }
}

export default Export;
