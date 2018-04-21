import React from 'react';
import PropTypes from 'prop-types';

export default class AuthorizationForm extends React.Component {
  handleClickAuthorize(e) {
    e.preventDefault();
    this.props.authorize();
  }

  handleClickClose() {
    document.querySelector('dialog#authorization-form').close();
    this.props.closeAuthorizationDialog(this.props.authorized);
  }

  render() {
    const { password, submitted, response, isValid, authorized } = this.props;

    return (
      <dialog className="mdl-dialog p-room__section--center" id="authorization-form">
        <button className="mdl-button mdl-js-button mdl-button--icon c-dialog__close" onClick={() => this.handleClickClose(authorized)}>
          <i className="material-icons">cancel</i>
        </button>

        <section className="mdl-grid">

          <form className={`${submitted ? 'p-authorization__form--inactive' : 'p-authorization__form--active'}`}>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text"> Enter room password</h2>
            </div>
            <div className="mdl-card__supporting-text p-room__card-body">
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ml5 p-room__password">
                <input
                  id="password"
                  className="mdl-textfield__input"
                  type="password"
                  onChange={e => this.props.changePassword(e.target.value)}
                  value={password}
                  disabled={submitted}
                  autoComplete="off"
                />
                <label className="mdl-textfield__label" htmlFor="password"> Password </label>
              </div>

              <div className="mdl-card__supporting-text">
                {response && response.get('status') === 401 &&
                <p className="error">Password is incorrect</p>
                }
              </div>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <button
                id="authorization-button"
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent p-room__button--create"
                onClick={e => this.handleClickAuthorize(e)}
                disabled={submitted || !isValid}
              >
                  Submit
              </button>
            </div>
          </form>
        </section>
        { authorized && this.handleClickClose(authorized) }
      </dialog>
    );
  }
}

AuthorizationForm.propTypes = {
  password: PropTypes.string,
  submitted: PropTypes.bool,
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isValid: PropTypes.bool,
  authorized: PropTypes.bool,
  changePassword: PropTypes.func.isRequired,
  authorize: PropTypes.func.isRequired,
  closeAuthorizationDialog: PropTypes.func.isRequired,
};

AuthorizationForm.defaultProps = {
  submitted: false,
  password: '',
  response: null,
  isValid: false,
  authorized: false,
};
