import * as React from 'react';
import * as firebase from 'firebase';

interface Props {
  title: string;
  data: string;
}

interface State {
  render: boolean;
}

export default class ViewSiteCard extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      render: false,
    };
  }

  onClick() {
    this.setState(
      {render: !this.state.render}
    );
  }

  render() {
    if (this.state.render) {
      return (
        <div className="site-card-cont">
          <div>
            <button className="button centered"
              key={this.props.title}
              onClick={() => this.onClick()}
            >
              <div className={"site-card-title"}>
                {this.props.title}
              </div>
            </button>
          </div>
          <div className="site-card-data">
            <div className="atf spark-bar-thin">
              {this.props.data}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="site-card-cont centered">
          <div>
            <button
              className="button centered"
              key={this.props.title}
              onClick={() => this.onClick()}
            >
              <div className="site-card-title">
                {this.props.title}
              </div>
            </button>
          </div>
        </div>
      );
    }
  }
}
