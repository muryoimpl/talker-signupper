import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/headers';

class Header extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    store.dispatch(actions.setRoomName(this.roomName()));
  }

  handleClickSignUp(e) {
    e.preventDefault();
    const { store } = this.context;
    const { signup } = this.props;

    store.dispatch(actions.toggleSignUp(signup));
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

          <span className="p-room__room-name">Room: {roomName}</span>
          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation">
            <a id="signup" className="mdl-navigation__link" href="#signup" onClick={e => this.handleClickSignUp(e)}>sign up</a>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  signup: PropTypes.string.isRequired,
  roomName: PropTypes.string,
};

Header.contextTypes = {
  store: PropTypes.object,
};

Header.defaultProps = {
  signup: 'open',
  roomName: '',
};

export default connect(state => ({
  signup: state.headers.signup,
  roomName: state.headers.roomName,
}))(Header);
