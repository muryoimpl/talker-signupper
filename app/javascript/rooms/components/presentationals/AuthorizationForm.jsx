import React from 'react';
import PropTypes from 'prop-types';

import CloseButton, { closeDialog } from './CloseButton';
import DialogTitle from './DialogTitle';
import PasswordInput from './PasswordInput';
import AuthorizationButton from './AuthorizationButton';

export default class AuthorizationForm extends React.Component {
  render() {
    const { password, submitted, response, isValid, authorized } = this.props;
    return (
      <dialog className="mdl-dialog p-room__section--center" id="authorization-form">
        <CloseButton onClick={this.props.closeAuthorizationDialog} selector={'dialog#authorization-form'} />

        <section className="mdl-grid">
          <form className={`${submitted ? 'p-authorization__form--inactive' : 'p-authorization__form--active'}`}>
            <DialogTitle title="Enter room password" />

            <div className="mdl-card__supporting-text p-room__card-body">
              <PasswordInput onChange={this.props.changePassword} value={password} disabled={submitted} />

              <div className="mdl-card__supporting-text">
                {response && response.get('status') === 401 &&
                <p className="error">Password is incorrect</p>
                }
              </div>
            </div>
            <div className="mdl-card__actions mdl-card--border">
              <AuthorizationButton disabled={submitted || !isValid} onClick={this.props.authorize} />
            </div>
          </form>
        </section>
        {authorized && closeDialog('dialog#authorization-form')}
      </dialog>
    );
  }
}

AuthorizationForm.propTypes = {
  password: PropTypes.string,
  submitted: PropTypes.bool,
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isValid: PropTypes.bool,
  authorized: PropTypes.bool.isRequired,
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
