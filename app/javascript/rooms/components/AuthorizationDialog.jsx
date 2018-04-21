import { connect } from 'react-redux';

import * as authActions from '../actions/authorization';
import * as talkActions from '../actions/talks';
import authorizationFormSelector from '../selectors/authorizationFormSelector';
import { wait } from '../utils/timer';
import AuthorizationForm from './presentationals/AuthorizationForm';

const mapStateToProps = state => ({
  submitted: state.authorization.submitted,
  password: state.authorization.password,
  response: state.authorization.response,
  isValid: authorizationFormSelector(state.authorization),
  authorized: state.authorization.authorized,
});

const mapDispatchToProps = dispatch => ({
  authorize: async () => {
    dispatch(talkActions.loading(true));
    dispatch(talkActions.shuffleOrder());
    await wait(1000);
    dispatch(talkActions.loading(false));
  },
  closeAuthorizationDialog: (authorized) => {
    if (!authorized) {
      dispatch(authActions.clearPassword());
      dispatch(authActions.clearAuthResponse());
    }
  },
  changePassword: (password) => {
    dispatch(authActions.changePassword(password));
  },
});

const AuthorizationDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizationForm);
export default AuthorizationDialog;
