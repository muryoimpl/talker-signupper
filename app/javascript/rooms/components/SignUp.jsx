import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/signups';
import signupFormSelector from '../selectors/signupFormSelector';

class SignUp extends React.Component {
  handleClickSignUp(e) {
    e.preventDefault();
    const { store } = this.context;
    const { title, talkerName } = this.props;
    store.dispatch(actions.registerSignuppersTalk(this.props.roomName, { title, talker_name: talkerName }));
  }

  handleClickClose(e) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(actions.clearSignupState());
    this.close();
  }

  changeTitle(title) {
    const { store } = this.context;
    store.dispatch(actions.changeTitle(title));
  }

  changeName(name) {
    const { store } = this.context;
    store.dispatch(actions.changeName(name));
  }

  close() {
    const { store } = this.context;
    const dom = document.querySelector('dialog#signup-form');
    if (dom && dom.getAttribute('open') === '') dom.close();

    if (this.props.open) {
      store.dispatch(actions.updateDialogOpen(false));
    }
  }

  open() {
    const { store } = this.context;
    if (!this.props.open) {
      store.dispatch(actions.updateDialogOpen(true));
    }
  }

  render() {
    const { submitted, title, talkerName, response, isValid, open } = this.props;
    return (
      <dialog className="mdl-dialog p-room__section--center" id="signup-form">
        <button className="mdl-button mdl-js-button mdl-button--icon p-signup__close" onClick={e => this.handleClickClose(e)}>
          <i className="material-icons">cancel</i>
        </button>

        <section className={'mdl-grid'}>

          <form className={`${submitted ? 'p-signup__form--inactive' : 'p-signup__form--active'}`}>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text"> Sign up your talk</h2>
            </div>
            <div className="mdl-card__supporting-text p-room__card-body">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ml5 p-room__name">
                <input
                  id="signup-name"
                  className="mdl-textfield__input"
                  type="text"
                  onChange={e => this.changeName(e.target.value)}
                  value={talkerName}
                  disabled={submitted}
                  autoComplete="off"
                />
                <label className="mdl-textfield__label" htmlFor="signup-name"> Talker name</label>
              </div>

              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ml5 p-room__name">
                <input
                  id="signup-title"
                  className="mdl-textfield__input"
                  type="text"
                  onChange={e => this.changeTitle(e.target.value)}
                  value={title}
                  disabled={submitted}
                  autoComplete="off"
                />
                <label className="mdl-textfield__label" htmlFor="signup-title">Title</label>
              </div>
              <div className="mdl-card__supporting-text">
                {response && response.get('errors') && response.get('errors').map(e =>
                  <p className="error" key={e}>{e}</p>,
                )}
              </div>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <button
                id="signup"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent p-room__button--create"
                onClick={e => this.handleClickSignUp(e)}
                disabled={submitted || !isValid}
              >
                SignUp
              </button>
            </div>
          </form>
        </section>
        {open ? this.open() : this.close()}
      </dialog>
    );
  }
}

SignUp.propTypes = {
  submitted: PropTypes.bool,
  title: PropTypes.string,
  talkerName: PropTypes.string,
  response: PropTypes.object,
  isValid: PropTypes.bool,
  roomName: PropTypes.string,
  open: PropTypes.bool,
};

SignUp.defaultProps = {
  submitted: false,
  title: '',
  talkerName: '',
  response: null,
  isValid: false,
  roomName: '',
  open: false,
};

SignUp.contextTypes = {
  store: PropTypes.object,
};

export default connect(state => ({
  submitted: state.signups.submitted,
  title: state.signups.title,
  talkerName: state.signups.talker_name,
  response: state.signups.response,
  roomName: state.headers.roomName,
  isValid: signupFormSelector(state.signups),
  open: state.signups.open,
}))(SignUp);
