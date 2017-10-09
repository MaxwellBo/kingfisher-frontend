import * as React from 'react';
import * as firebase from 'firebase';

interface Props {
  title: string;
  data: string;
};

interface State {
  shouldRender: boolean,
}

export default class ViewSiteCard extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      shouldRender: true,
    }
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <div className="centered ">
          <div className="subtitle is-4 site-card-title">
            {this.props.title}
          </div>
          <p className="atf spark-bar-medium centered site-card-data">
            {this.props.data}
          </p>
        </div>
      );
    } else {
      return <div/>;
    }
  }
}

