import React from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  render() {
    return (
      <div className="p-timer__clock-frame">
        <div className="mdl-card__title p-timer__title">
          <h3 className="mdl-card__title-text tac p-timer__title">{title}</h3>
        </div>
        <div className="mdl-card__supporting-text p-timer__talker-name">{talkerName}</div>

        <div className="p-timer__body">
          <span className="p-timer__clock">
            05:00
          </span>
        </div>

        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button">Start</button>
          <button type="button" className="mdl-button">Stop</button>
          <button type="button" className="mdl-button">Reset</button>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Timer);
