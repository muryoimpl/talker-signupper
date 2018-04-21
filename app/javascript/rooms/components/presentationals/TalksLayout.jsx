import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { TransitionGroup } from 'react-transition-group';

import TalksGroup from '../TalksGroup';
import Talk from '../Talk';
import NoEntry from './NoEntry';
import Spinner from './Spinner';

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
    const { entries, done, loading } = this.props;
    const height = window.innerHeight - 150;

    return (
      <div>
        {loading &&
          <Spinner height={height} loading={loading} />
        }
        {entries.size === 0 &&
          <NoEntry />
        }
        <TransitionGroup>
          {entries.map((talk, i) => (
            <TalksGroup timeout={300} key={`talk-group-${talk.get('id')}`}>
              <Talk talk={talk} key={talk.get('id')} i={i} done={false} />
            </TalksGroup>
          ))}
        </TransitionGroup>

        {(done.size > 0 && entries.size !== 0) &&
          <hr className="p-room__hr" />
        }

        {done.size > 0 &&
          <TransitionGroup>
            {done.map((talk, i) => (
              <TalksGroup timeout={300} key={`talk-group-done-${talk.get('id')}`}>
                <Talk talk={talk} key={`done-${talk.get('id')}`} i={i} done />
              </TalksGroup>
            ))}
          </TransitionGroup>
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
