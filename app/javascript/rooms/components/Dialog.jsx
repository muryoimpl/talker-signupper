import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/dialogs';

class Dialog extends React.Component {
  componentDidUpdate() {
    this.handleShowDialog(this.props.isDisplay);
  }

  handleClickClose(e) {
    e.preventDefault();
    const { store } = this.context;

    store.dispatch(actions.closeDialog());
    document.querySelector('dialog').close();
  }

  handleShowDialog() {
    if (this.props.isDisplay === 'true') {
      document.querySelector('dialog').showModal();
    }
  }

  render() {
    const { message, isDisplay } = this.props;

    return (
      <dialog className="mdl-dialog">
        <div className="mdl-dialog__content">
          <p >{message}</p>
        </div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button close" onClick={e => this.handleClickClose(e)}>Close</button>
        </div>
        <input type="hidden" id="dialog-toggle" value={isDisplay} onChange={this.handleShowDialog()} />
      </dialog>
    );
  }
}

Dialog.propTypes = {
  message: PropTypes.string,
  isDisplay: PropTypes.bool.isRequired,
};

Dialog.defaultProps = {
  message: '',
  isDisplay: false,
};

Dialog.contextTypes = {
  store: PropTypes.object,
};

export default connect(state => ({
  isDisplay: state.dialogs.isDisplay,
  message: state.dialogs.message,
}))(Dialog);