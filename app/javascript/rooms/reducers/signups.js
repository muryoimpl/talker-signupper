import SignupForm from '../models/signupForm';
import * as Types from '../constants/actions';

export default function signups(signupForm = new SignupForm(), action) {
  switch (action.type) {
    case Types.CHANGE_TITLE:
      return signupForm.merge({ title: action.title });
    case Types.CHANGE_NAME:
      return signupForm.merge({ talker_name: action.talker_name });
    case Types.CLEAR_SIGNUP_signupForm:
      return signupForm.merge({ title: '', talker_name: '', response: null });
    case Types.STORE_RESPONSE:
      return signupForm.merge({ response: action.response });
    case Types.CLEAR_RESPONSE:
      return signupForm.merge({ response: null });
    case Types.CHANGE_FORM_signupForm:
      return signupForm.merge({ submitted: action.submitted });
    case Types.REGISTER_SIGNUPPER_TALK:
    default:
      return signupForm;
  }
}
