import * as React from 'react';
import * as firebase from 'firebase';

interface Props {
  title: string;
  data: string;
}

interface State {
  shouldRender: boolean;
}

export default class ViewSiteCard extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      shouldRender: false,
    };
  }

  onClick() {
    this.setState(
      {shouldRender: !this.state.shouldRender}
    );
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <div className="site-card-cont">
          <div>
            <button
              className="button centered"
              key={this.props.title}
              onClick={() => this.onClick()}
            >
              <div className="subtitle is-4 site-card-title">
                {this.props.title}
              </div>
            </button>
          </div>
          <div className="site-card-cont">
            <div className="atf spark-bar-medium site-card-data">
              {this.props.data}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="site-card-cont centered">
          <button
            className="button centered"
            key={this.props.title}
            onClick={() => this.onClick()}
          >
            <div className="subtitle is-4 site-card-title">
              {this.props.title}
            </div>
          </button>
        </div>
      );
    }
  }
}
