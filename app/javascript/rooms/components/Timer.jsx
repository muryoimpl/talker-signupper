import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/timer';

class Timer extends React.Component {
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
      store.dispatch(actions.openTimer());
    }
  }

  render() {
    const { open } = this.props;
    return (
      <dialog className="mdl-dialog" id="timer-frame">
        <button className="mdl-button mdl-js-button mdl-button--icon c-dialog__close" onClick={e => this.handleClickClose(e)}>
          <i className="material-icons">cancel</i>
        </button>
        TIMER
        {open ? this.open() : this.close()}
      </dialog>
    );
  }
}

Timer.contextTypes = {
  store: PropTypes.object,
};

Timer.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default connect(state => ({
  open: state.timer.open,
}))(Timer);