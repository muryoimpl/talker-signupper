import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from './CloseButton';

export default class SignupForm extends React.Component {
  handleClickSignUp(e) {
    e.preventDefault();
    const { roomName, title, talkerName } = this.props;
    this.props.registerTalk(roomName, title, talkerName);
  }

  open() {
    this.props.openSignupDialog(this.props.open);
  }

  render() {
    const { submitted, title, talkerName, response, isValid } = this.props;
    return (
      <dialog className="mdl-dialog p-room__section--center" id="signup-form">
        <CloseButton onClick={this.props.clearSignupForm} className={'c-dialog__close'} selector="dialog#signup-form" />

        <section className="mdl-grid">
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
                  onChange={e => this.props.changeTalkerName(e.target.value)}
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
                  onChange={e => this.props.changeTitle(e.target.value)}
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
      </dialog>
    );
  }
}

SignupForm.propTypes = {
  submitted: PropTypes.bool,
  title: PropTypes.string,
  talkerName: PropTypes.string,
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isValid: PropTypes.bool,
  roomName: PropTypes.string,
  open: PropTypes.bool,
  registerTalk: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeTalkerName: PropTypes.func.isRequired,
  clearSignupForm: PropTypes.func.isRequired,
  openSignupDialog: PropTypes.func.isRequired,
};

SignupForm.defaultProps = {
  submitted: false,
  title: '',
  talkerName: '',
  response: null,
  isValid: false,
  roomName: '',
  open: false,
};
