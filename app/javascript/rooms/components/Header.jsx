import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import * as actions from '../actions/headers';

class Header extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    store.dispatch(actions.setRoomName(this.roomName()));
  }

  handleClickSignUp(e) {
    e.preventDefault();

    document.querySelector('dialog#signup-form').showModal();
  }

  handleClickLeave(e) {
    e.preventDefault();
    const history = createHistory();
    history.push('/');
    history.go();
  }

  roomName() {
    const resources = window.location.pathname.split('/');
    return resources[resources.findIndex(elm => elm === 'rooms') + 1];
  }

  render() {
    const { roomName } = this.props;

    return (
      <div className="mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <span><a className="text-like" href="/">Talker SignUpper</a></span>
          </span>

          <span className="p-room__room-name">#{roomName}</span>
          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation ">
            <button id="signup" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={e => this.handleClickSignUp(e)}>
              sign up
            </button>
          </nav>
          <nav className="mdl-navigation">
            <button id="leave" className="ml10 mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={e => this.handleClickLeave(e)}>
              leave this room
            </button>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  roomName: PropTypes.string,
};

Header.contextTypes = {
  store: PropTypes.object,
};

Header.defaultProps = {
  roomName: '',
};

export default connect(state => ({
  roomName: state.headers.roomName,
}))(Header);
