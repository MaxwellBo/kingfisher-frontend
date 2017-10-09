import * as React from 'react';
import * as firebase from 'firebase';

interface Props{}
interface State{
  code: string;
  latitude: string;
  longitude: string;
}

class NewSite extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      code: "",
      latitude: "",
      longitude: "",
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
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
                <input className="input" type="text" value={this.state.code} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Latitude</label>
              <div className="control">
                <input className="input" type="text" value={this.state.latitude} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="field">
              <label className="label">Longitude</label>
              <div className="control">
                <input className="input" type="text" value={this.state.longitude} onChange={this.handleChange} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}