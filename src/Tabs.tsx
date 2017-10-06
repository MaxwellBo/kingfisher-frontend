import * as React from 'react';
import { Link, Route } from 'react-router-dom';

export default class Tabs extends React.Component {
  render() {
    return (
      <div className="tabs is-centered is-primary">
        <ul>
          <Link to="/app/export">
            <li>
              <span className="icon is-small"><i className="fa fa-area-chart"/></span>
              <span>View Data</span>
            </li>
          </Link>
          <Link to="/app/export">
            <li>
              <span className="icon is-small"><i className="fa fa-map"/></span>
              <span>New Site</span>
            </li>
          </Link>
          <Link to="/app/export">
            <li>
              <span className="icon is-small"><i className="fa fa-edit"/></span>
              <span>Input Data</span>
            </li>
          </Link>
          <Link to="/app/export">
            <li>
              <span className="icon is-small"><i className="fa fa-download"/></span>
              <span>Export</span>
            </li>
          </Link>
        </ul>
      </div>
    );
  }
}