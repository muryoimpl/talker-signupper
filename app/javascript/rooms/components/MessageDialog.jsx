import { connect } from 'react-redux';

import * as actions from '../actions/dialogs';
import MessageDialogContent from './presentationals/MessageDialogContent';

const mapStateToProps = state => ({
  message: state.dialogs.message,
  isDisplay: state.dialogs.isDisplay,
});

const mapDispatchToProps = dispatch => ({
  handleShowDialog: () => {
    const dom = document.querySelector('dialog');
    if (dom) dom.showModal();
  },
  handleClickClose(e) {
    e.preventDefault();
    dispatch(actions.closeDialog());
    const dom = document.querySelector('dialog');
    if (dom) dom.close();
  },
});

const MessageDialog = connect(mapStateToProps, mapDispatchToProps)(MessageDialogContent);
export default MessageDialog;
