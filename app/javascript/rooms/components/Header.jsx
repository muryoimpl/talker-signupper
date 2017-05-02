import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/headers';

class Header extends React.Component {
  handleClickSignUp(e) {
    e.preventDefault();
    const { store } = this.context;
    const { signup } = this.props;

    store.dispatch(actions.toggleSignUp(signup));
  }

  render() {
    return (
      <div className="mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <span><a href="/">Talker SignUpper</a></span>
          </span>

          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation">
            <a id="signup" className="mdl-navigation__link" href="#signup" onClick={this.handleClickSignUp}>sign up</a>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  signup: PropTypes.string.isRequired,
};

Header.contextTypes = {
  store: PropTypes.object,
};

Header.defaultProps = {
  signup: 'open',
};

export default connect(state => ({
  signup: state.headers.signup,
}))(Header);
