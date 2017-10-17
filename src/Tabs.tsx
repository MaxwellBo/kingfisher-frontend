import * as React from 'react';
import { Link, Route } from 'react-router-dom';

interface Props { }

interface State { activeTab: string; }

export default class Tabs extends React.Component<Props, State> {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      activeTab: "",
    }
  }

  changeTab = (name) => {
    //this.setState({activeTab: name})
  }

  render() {
    console.log(this.context);
    return (
      <div className="tabs-container">
        <div className="tabs-logo-cont">
          <img className="tabs-logo" src="../../images/favicon-32x32.png" alt="Kingfisher" />
        </div>
        <div className="tabs is-centered is-primary is-medium">
          <ul>
            <Link onClick={() => this.changeTab("view")} to="/app/view">
              <li className={this.context.router.route.location.pathname === '/app/view' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-area-chart"/></span>
                <span>View Data</span>
              </li>
            </Link>
            <Link onClick={() => this.changeTab("newsite")} to="/app/newsite">
              <li className={this.context.router.route.location.pathname === '/app/newsite' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-map"/></span>
                <span>New Site</span>
              </li>
            </Link>
            <Link onClick={() => this.changeTab("export")} to="/app/export">
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