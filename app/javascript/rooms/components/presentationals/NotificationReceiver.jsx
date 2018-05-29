import React from 'react';
import PropTypes from 'prop-types';

export default class NotificationReceiver extends React.Component {
  componentDidMount() {
    /* istanbul ignore next */
    App.talks = App.cable.subscriptions.create(
      { channel: 'RoomChannel', name: `${this.props.name}` },
      {
        received: (data) => {
          this.props.receiveJSON(data);
        },
        connected: () => {
          this.props.changeSocketState(true);
        },
        disconnected: () => {
          this.props.changeSocketState(false);
        },
      },
    );
  }

  render() {
    return '';
  }
}

NotificationReceiver.propTypes = {
  name: PropTypes.string.isRequired,
  receiveJSON: PropTypes.func.isRequired,
  changeSocketState: PropTypes.func.isRequired,
};
