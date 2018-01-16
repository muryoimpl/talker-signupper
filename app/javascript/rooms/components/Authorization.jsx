import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authActions from '../actions/authorization';
import * as talkActions from '../actions/talks';
import authorizationFormSelector from '../selectors/authorizationFormSelector';
import { wait } from '../utils/timer';

class Authorization extends React.Component {
  async handleClickAuthorize(e) {
    e.preventDefault();
    const { store } = this.context;
    store.dispatch(talkActions.loading(true));
    store.dispatch(talkActions.shuffleOrder());
    await wait(1000);
    store.dispatch(talkActions.loading(false));
  }

  handleClickClose(e) {
    if (e) e.preventDefault();
    this.close();
    if (!this.props.authorized) {
      const { store } = this.context;
      store.dispatch(authActions.clearPassword());
      store.dispatch(authActions.clearAuthResponse());
    }
  }

  changePassword(password) {
    const { store } = this.context;
    store.dispatch(authActions.changePassword(password));
  }

  close() {
    document.querySelector('dialog#authorization-form').close();
  }

  render() {
    const { password, submitted, response, isValid, authorized } = this.props;

    return (
      <dialog className="mdl-dialog p-room__section--center" id="authorization-form">
        <button className="mdl-button mdl-js-button mdl-button--icon p-authorization__close p-signup__close" onClick={e => this.handleClickClose(e)}>
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
                  onChange={e => this.changePassword(e.target.value)}
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
        { authorized && this.handleClickClose() }
      </dialog>
    );
  }
}

Authorization.propTypes = {
  password: PropTypes.string,
  submitted: PropTypes.bool,
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isValid: PropTypes.bool,
  authorized: PropTypes.bool,
};

Authorization.defaultProps = {
  submitted: false,
  password: '',
  response: null,
  isValid: false,
  authorized: false,
};

Authorization.contextTypes = {
  store: PropTypes.object,
};

export default connect(state => ({
  submitted: state.authorization.submitted,
  password: state.authorization.password,
  response: state.authorization.response,
  isValid: authorizationFormSelector(state.authorization),
  authorized: state.authorization.authorized,
}))(Authorization);
