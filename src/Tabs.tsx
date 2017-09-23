import * as React from 'react';
import { Link, Route } from 'react-router-dom';

export default class Tabs extends React.Component {
  render() {
    return (
      <div className="tabs">
        <ul>
          <Link to="/app/export"><li><a>Export</a></li></Link>
        </ul>
      </div>
    );
  }
}