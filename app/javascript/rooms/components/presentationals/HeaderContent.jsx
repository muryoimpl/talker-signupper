import React from 'react';
import PropTypes from 'prop-types';

import AppTitle from './AppTitle';
import RoomTag from './RoomTag';
import ShuffleButton from './ShuffleButton';
import EntryButton from './EntryButton';
import LeaveButton from './LeaveButton';

export default class HeaderContent extends React.Component {
  componentDidMount() {
    this.props.setRoomName(this.roomName());
  }

  roomName() {
    const resources = window.location.pathname.split('/');
    return resources[resources.findIndex(elm => elm === 'rooms') + 1];
  }

  render() {
    const { roomName, connected } = this.props;
    return (
      <header className="layout-header mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row">
          <AppTitle title="Talker Signupper" />
          <RoomTag roomName={roomName} />
          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation">
            <ShuffleButton disabled={!connected} authorized={this.props.authorized} onClick={this.props.shuffleOrder} />
          </nav>

          <nav className="mdl-navigation">
            <EntryButton disabled={!connected} onClick={this.props.showSignUpDialog} />
          </nav>

          <nav className="mdl-navigation">
            <LeaveButton disabled={!connected} onClick={this.props.backToRootPage} />
          </nav>
        </div>
      </header>
    );
  }
}

HeaderContent.propTypes = {
  roomName: PropTypes.string,
  connected: PropTypes.bool,
  authorized: PropTypes.bool,
  setRoomName: PropTypes.func.isRequired,
  showSignUpDialog: PropTypes.func.isRequired,
  backToRootPage: PropTypes.func.isRequired,
  shuffleOrder: PropTypes.func.isRequired,
};

HeaderContent.defaultProps = {
  roomName: '',
  authorized: false,
  connected: false,
};
