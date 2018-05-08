import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import NoEntry from './NoEntry';
import Spinner from './Spinner';
import Entries from './Entries';
import Done from './Done';

export default class TalksLayout extends React.Component {
  componentDidMount() {
    this.props.showLoading(true);
    this.props.fetchTalks(this.props.entries);

    App.talks = App.cable.subscriptions.create({ channel: 'RoomChannel', name: `${this.props.name}` }, {
      received: (data) => {
        this.props.receiveJSON(data);
      },
      connected: () => {
        this.props.changeSocketState(true);
      },
      disconnected: () => {
        this.props.changeSocketState(false);
      },
    });
  }

  render() {
    const height = window.innerHeight - 150;
    return (
      <div>
        {this.props.loading &&
          <Spinner height={height} />
        }
        {(this.props.entries.size === 0 && this.props.done.size === 0) &&
          <NoEntry />
        }
        <Entries entries={this.props.entries} />

        {(this.props.done.size > 0 && this.props.entries.size !== 0) &&
          <hr className="p-room__hr" />
        }
        {this.props.done.size > 0 &&
          <Done done={this.props.done} />
        }
      </div>
    );
  }
}

TalksLayout.propTypes = {
  entries: PropTypes.instanceOf(Immutable.List),
  done: PropTypes.instanceOf(Immutable.List),
  name: PropTypes.string.isRequired,
  showLoading: PropTypes.func.isRequired,
  receiveJSON: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchTalks: PropTypes.func.isRequired,
  changeSocketState: PropTypes.func.isRequired,
};

TalksLayout.defaultProps = {
  entries: new Immutable.List(),
  done: new Immutable.List(),
  loading: true,
};
