import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { signup } = this.props;

    return (
      <div className="mdl-layout__header mdl-layout__header--waterfall">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <span><a href="/">Talker SignUpper</a></span>
          </span>

          <div className="mdl-layout-spacer" />

          <nav className="mdl-navigation">
            { signup &&
              <a className="mdl-navigation__link" href="#signup">sign up</a>
            }
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  signup: PropTypes.bool,
};

Header.contextTypes = {
  store: PropTypes.object,
};

Header.defaultProps = {
  signup: true,
};

export default connect(state => ({
  signup: state.headers.signup,
}))(Header);
