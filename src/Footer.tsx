import * as React from 'react';

// A simple footer component to appear at the bottom of every page.
export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <strong>Kingfisher</strong> by Hugo Kawamata, Max Bo, Haziq Nordin, Sanika Naik, and Yuji Takahashi.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}