import * as React from 'react';
import { Link, Route } from 'react-router-dom';

interface Props { }

interface State { activeTab: string; }

// The navigational component for the web application. Allows users
// to change the feature they are currently using via react router.
export default class Tabs extends React.PureComponent<Props, State> {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className="tabs-container">
        <div className="tabs-logo-cont">
          <img className="tabs-logo" src="../../images/kingfisher_logo_text.png" alt="Kingfisher" />
        </div>
        <div className="tabs is-centered is-primary is-medium">
          <ul>
            <Link to="/app/view">
              <li className={this.context.router.route.location.pathname === '/app/view' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-area-chart"/></span>
                <span>View Data</span>
              </li>
            </Link>
            <Link to="/app/newsite">
              <li className={this.context.router.route.location.pathname === '/app/newsite' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-map"/></span>
                <span>New Site</span>
              </li>
            </Link>
            <Link to="/app/export">
              <li className={this.context.router.route.location.pathname === '/app/export' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-download"/></span>
                <span>Export</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}