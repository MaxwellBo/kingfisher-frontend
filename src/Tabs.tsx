import * as React from 'react';
import { Link, Route } from 'react-router-dom';

interface Props { }

interface State { activeTab: string; }

export default class Tabs extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      activeTab: "",
    }
  }

  changeTab = (name) => {
    this.setState({activeTab: name})
  }

  render() {
    return (
      <div className="tabs-container">
        <div className="tabs-logo-cont">
          <img className="tabs-logo" src="../../images/favicon-32x32.png" alt="Kingfisher" />
        </div>
        <div className="tabs is-centered is-primary is-medium">
          <ul>
            <Link onClick={() => this.changeTab("view")} to="/app/view">
              <li className={this.state.activeTab === 'view' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-area-chart"/></span>
                <span>View Data</span>
              </li>
            </Link>
            <Link onClick={() => this.changeTab("newsite")} to="/app/newsite">
              <li className={this.state.activeTab === 'newsite' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-map"/></span>
                <span>New Site</span>
              </li>
            </Link>
            <Link onClick={() => this.changeTab("import")} to="/app/input">
              <li className={this.state.activeTab === 'import' ? 'active-tab' : ''}>
                <span className="icon is-small"><i className="fa fa-edit"/></span>
                <span>Import Data</span>
              </li>
            </Link>
            <Link onClick={() => this.changeTab("export")} to="/app/export">
              <li className={this.state.activeTab === 'export' ? 'active-tab' : ''}>
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