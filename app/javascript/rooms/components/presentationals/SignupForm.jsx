import React from 'react';
import PropTypes from 'prop-types';

import CloseButton, { closeDialog } from './CloseButton';
import DialogTitle from './DialogTitle';
import SignupSubmitButton from './SignupSubmitButton';
import SignupErrors from './SignupErrors';
import TextInput from './TextInput';

const SignupForm = ({ submitted, title, talkerName, response, isValid, open, roomName, changeTalkerName, changeTitle, registerTalk, clearSignupForm }) => (
  <dialog className="mdl-dialog p-room__section--center" id="signup-form">
    <CloseButton onClick={clearSignupForm} className={'c-dialog__close'} selector="dialog#signup-form" />

    <section className="mdl-grid">
      <form className={`${submitted ? 'p-signup__form--inactive' : 'p-signup__form--active'}`}>
        <DialogTitle title="Sign up your talk" />

        <div className="mdl-card__supporting-text p-room__card-body">
          <TextInput id="signup-name" onChange={changeTalkerName} value={talkerName} disabled={Boolean(submitted)} label="Talker name" />
          <TextInput id="signup-title" onChange={changeTitle} value={title} disabled={Boolean(submitted)} label="Title" />
          {response && response.get('errors') &&
            <SignupErrors errors={response.get('errors')} />
          }
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <SignupSubmitButton disabled={submitted || !isValid} onClick={() => registerTalk(roomName, title, talkerName)} />
        </div>
      </form>
    </section>
    {!open && closeDialog('dialog#signup-form')}
  </dialog>
);

SignupForm.propTypes = {
  submitted: PropTypes.bool,
  title: PropTypes.string,
  talkerName: PropTypes.string,
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isValid: PropTypes.bool,
  roomName: PropTypes.string,
  open: PropTypes.bool.isRequired,
  registerTalk: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeTalkerName: PropTypes.func.isRequired,
  clearSignupForm: PropTypes.func.isRequired,
};

SignupForm.defaultProps = {
  submitted: false,
  title: '',
  talkerName: '',
  response: null,
  isValid: false,
  roomName: '',
};

export default SignupForm;
