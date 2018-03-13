import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/timer';
import Timer from './Timer';

class TimerDialog extends React.Component {
  handleClickClose(e) {
    if (e) e.preventDefault();
    this.close();
  }

  close() {
    const { store } = this.context;
    const dom = document.querySelector('dialog#timer-frame');
    if (dom && dom.getAttribute('open') === '') dom.close();

    if (this.props.open) {
      store.dispatch(actions.closeTimer());
    }
  }

  open() {
    const { store } = this.context;
    if (!this.props.open) {
      store.dispatch(actions.openTimer({ title: this.props.title, talkerName: this.props.talkerName }));
    }
  }

  render() {
    const { open } = this.props;
    return (
      <dialog className="mdl-dialog p-timer__dialog-frame" id="timer-frame">
        <button className="mdl-button mdl-js-button mdl-button--icon c-dialog__close" onClick={e => this.handleClickClose(e)}>
          <i className="material-icons">cancel</i>
        </button>
        <Timer store={this.context.store} />
        {open ? this.open() : this.close()}
      </dialog>
    );
  }
}

TimerDialog.contextTypes = {
  store: PropTypes.object,
};

TimerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  talkerName: PropTypes.string,
};

TimerDialog.defaultProps = {
  title: '',
  talkerName: '',
};

export default connect(state => ({
  open: state.timer.open,
  title: state.timer.title,
  talkerName: state.timer.talkerName,
}))(TimerDialog);
