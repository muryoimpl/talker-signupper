import { connect } from 'react-redux';

import * as actions from '../actions/signups';
import signupFormSelector from '../selectors/signupFormSelector';
import SignupForm from './presentationals/SignupForm';

const mapStateToProps = state => ({
  submitted: state.signups.submitted,
  title: state.signups.title,
  talkerName: state.signups.talkerName,
  response: state.signups.response,
  roomName: state.headers.roomName,
  isValid: signupFormSelector(state.signups),
  open: state.signups.open,
});

const mapDispatchToProps = dispatch => ({
  registerTalk: (roomName, title, talkerName) => {
    dispatch(actions.registerSignuppersTalk(roomName, { title, talkerName }));
  },
  clearSignupForm: () => {
    dispatch(actions.clearSignupState());
  },
  changeTitle: (title) => {
    dispatch(actions.changeTitle(title));
  },
  changeTalkerName: (name) => {
    dispatch(actions.changeName(name));
  },
  closeSignupDialog: () => {
    dispatch(actions.updateDialogOpen(false));
  },
  openSignupDialog(open) {
    if (!open) dispatch(actions.updateDialogOpen(true));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
