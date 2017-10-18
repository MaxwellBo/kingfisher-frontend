import * as React from 'react';
import * as firebase from 'firebase';

interface Props { }
interface State {
  code: string;
  latitude: string;
  longitude: string;
  sites: {};
  sitesRef: firebase.database.Reference;
}

export default class NewSite extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      code: '',
      latitude: '',
      longitude: '',
      sites: {},
      sitesRef: firebase.database().ref('sites'),
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  pushNewSite = () => {
    let ref = this.state.sitesRef.child(this.state.code);
    ref.set({
      latitude: this.state.latitude, 
      longitude: this.state.longitude,
      measurements: '',
    });
    window.location.reload(); // TODO: Change this to a redirect (to the site's vis page?)
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">New Site</h1>
          <h2 className="subtitle">Make a new site</h2>
        </div>
        <div className="container">
          <div className="new-site-form">
            <div className="field">
              <label className="label">Site Code</label>
              <div className="control">
                <input className="input" type="text" name="code" onChange={this.handleChange}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Latitude</label>
              <div className="control">
                <input className="input" type="text" name="latitude" onChange={this.handleChange}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Longitude</label>
              <div className="control">
                <input className="input" type="text" name="longitude" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={this.pushNewSite}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}