import React from 'react';
import PropTypes from 'prop-types';

export default class HeaderContent extends React.Component {
  componentDidMount() {
    this.props.setRoomName(this.roomName());
  }

  roomName() {
    const resources = window.location.pathname.split('/');
    return resources[resources.findIndex(elm => elm === 'rooms') + 1];
  }

  clearDirty() {
    const mdlInputs = document.querySelectorAll('.mdl-js-textfield');
    for (let i = 0, l = mdlInputs.length; i < l; i += 1) {
      mdlInputs[i].MaterialTextfield.checkDirty();
    }
  }

  handleClickSignUp(e) {
    e.preventDefault();
    this.clearDirty();
    document.querySelector('dialog#signup-form').showModal();
    this.props.showSignUpDialog();
  }

  handleClickLeave(e) {
    e.preventDefault();
    this.props.backToRootPage();
  }

  async handleShuffleOrder(e) {
    e.preventDefault();
    if (this.props.authorized) {
      await this.props.shuffleOrder();
    } else {
      document.querySelector('dialog#authorization-form').showModal();
    }
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