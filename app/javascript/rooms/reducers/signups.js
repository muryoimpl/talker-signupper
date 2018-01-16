import SignupForm from '../models/signupForm';
import * as Types from '../constants/actions';

export default function signups(signupForm = new SignupForm(), action) {
  switch (action.type) {
    case Types.CHANGE_TITLE:
      return signupForm.merge({ title: action.title });
    case Types.CHANGE_NAME:
      return signupForm.merge({ talkerName: action.talkerName });
    case Types.CLEAR_SIGNUP_STATE:
      return signupForm.merge({ title: '', talkerName: '', response: null });
    case Types.STORE_RESPONSE:
      return signupForm.merge({ response: action.response });
    case Types.CLEAR_RESPONSE:
      return signupForm.merge({ response: null });
    case Types.CHANGE_FORM_STATE:
      return signupForm.merge({ submitted: action.submitted });
    case Types.UPDATE_DIALOG_OPEN:
      return signupForm.merge({ open: action.open });
    case Types.REGISTER_SIGNUPPER_TALK:
    default:
      return signupForm;
  }
}
