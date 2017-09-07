import * as React from 'react';
import './App.css';

class TOS extends React.PureComponent<{}, {}> {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Section</h1>
          <h2 className="subtitle">
            A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
        </h2>
        </div>
      </section>
    );
  }
}

export default TOS;
