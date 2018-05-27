import { connect } from 'react-redux';

import * as authActions from '../actions/authorization';
import * as talkActions from '../actions/talks';
import authorizationFormSelector from '../selectors/authorizationFormSelector';
import AuthorizationForm from './presentationals/AuthorizationForm';

const mapStateToProps = state => ({
  submitted: state.authorization.submitted,
  password: state.authorization.password,
  response: state.authorization.response,
  isValid: authorizationFormSelector(state.authorization),
  authorized: state.authorization.authorized,
});

const mapDispatchToProps = dispatch => ({
  authorize: (e) => {
    e.preventDefault();
    // TODO: ここを固定にしないようにしないと再利用できない
    dispatch(talkActions.shuffleOrder());
  },
  closeAuthorizationDialog: () => {
    dispatch(authActions.clearPassword());
    dispatch(authActions.clearAuthResponse());
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
