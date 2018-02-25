import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import * as actions from '../actions/headers';
import * as signupActions from '../actions/signups';
import * as talkActions from '../actions/talks';
import { wait } from '../utils/timer';

class Header extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    store.dispatch(actions.setRoomName(this.roomName()));
  }

  handleClickSignUp(e) {
    e.preventDefault();

    const { store } = this.context;
    this.clearDirty();
    document.querySelector('dialog#signup-form').showModal();
    store.dispatch(signupActions.updateDialogOpen(true));
  }

  clearDirty() {
    const mdlInputs = document.querySelectorAll('.mdl-js-textfield');
    for (let i = 0, l = mdlInputs.length; i < l; i += 1) {
      mdlInputs[i].MaterialTextfield.checkDirty();
    }
  }

  handleClickLeave(e) {
    e.preventDefault();

    const history = createHistory();
    history.push('/');
    history.go();
  }

  async handleShuffleOrder(e) {
    e.preventDefault();

    if (this.props.authorized) {
      const { store } = this.context;
      store.dispatch(talkActions.loading(true));
      store.dispatch(talkActions.shuffleOrder());
      await wait(1000);
      store.dispatch(talkActions.loading(false));
    } else {
      document.querySelector('dialog#authorization-form').showModal();
    }
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
          <span className="mdl-layout-title">
            <span><a className="text-like" href="/">Talker SignUpper</a></span>
          </span>

          <span className="p-room__room-name">
            <a className="p-room__room-name-link" href={window.location.href}>#{roomName}</a>
          </span>
          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation">
            <button
              id="shuffle"
              disabled={!connected}
              className="mdl-button mdl-js-button mdl-button--raised p-header__shuffle"
              onClick={e => this.handleShuffleOrder(e)}
            >
              shuffle
            </button>
          </nav>

          <nav className="mdl-navigation">
            <button
              id="signup"
              disabled={!connected}
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              onClick={e => this.handleClickSignUp(e)}
            >
              entry
            </button>
          </nav>
          <nav className="mdl-navigation">
            <button
              id="leave"
              disabled={!connected}
              className="ml10 mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
              onClick={e => this.handleClickLeave(e)}
            >
              leave this room
            </button>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  roomName: PropTypes.string,
  connected: PropTypes.bool,
  authorized: PropTypes.bool,
};

Header.contextTypes = {
  store: PropTypes.object,
};

Header.defaultProps = {
  roomName: '',
  authorized: false,
  connected: false,
};

export default connect(state => ({
  roomName: state.headers.roomName,
  authorized: state.authorization.authorized,
  connected: state.globals.connected,
}))(Header);
