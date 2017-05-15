import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/signups';

class SignUp extends React.Component {
  handleClickSignUp(e) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(actions.registerSignuppersTalk());
  }

  changeTitle(title) {
    const { store } = this.context;
    store.dispatch(actions.changeTitle(title));
  }

  changeName(name) {
    const { store } = this.context;
    store.dispatch(actions.changeName(name));
  }

  render() {
    const { signup } = this.props;
    return (
      <section className={`p-room__section--center mdl-grid ${signup === 'open' ? 'show' : 'hidden'}`}>
        <form className="p-room__card--wide">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text"> Sign up your talk</h2>
          </div>
          <div className="mdl-card__supporting-text p-room__card-body">
            <div className="mdl-textfield mdl-js-textfield ml5 p-room__name">
              <input id="signup-name" className="mdl-textfield__input" type="text" autoFocus onChange={e => this.changeName(e.target.value)} />
              <label className="mdl-textfield__label" htmlFor="your name">Your name</label>
            </div>

            <div className="mdl-textfield mdl-js-textfield ml5 p-room__name">
              <input id="signup-title" className="mdl-textfield__input" type="text" onChange={e => this.changeTitle(e.target.value)} />
              <label className="mdl-textfield__label" htmlFor="title">Talk title</label>
            </div>
          </div>

          <div className="mdl-card__actions mdl-card--border">
            <button
              id="signup"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent p-room__button--create"
              onClick={e => this.handleClickSignUp(e)}
            >
              SignUp
            </button>
          </div>
        </form>
      </section>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.string.isRequired,
};

SignUp.contextTypes = {
  store: PropTypes.object,
};

export default connect(state => ({
  signup: state.headers.signup,
}))(SignUp);