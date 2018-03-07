import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import * as timerActions from '../actions/timer';

export default class Talk extends React.Component {
  handleClickOpen(e) {
    e.preventDefault();
    this.context.store.dispatch(timerActions.openTimer({
      tittle: this.props.talk.get('title'),
      talkerName: this.props.talk.get('talker_name'),
    }));
    document.querySelector('dialog#timer-frame').showModal();
  }

  render() {
    const { talk } = this.props;
    const title = talk.get('title');
    const talkerName = talk.get('talker_name');

    return (
      <section className="p-talk mdl-grid mdl-grid--no-spacing mdl-shadow--3dp">
        <div className="p-talk-card mdl-card">
          <div className="p-talk-card__text mdl-card__supporting-text">
            <h3 className="p-talk-title">{title}</h3>
            <div className="p-talk-talker">{talkerName}</div>
          </div>
        </div>

        { this.props.i === 0 &&
          <a href="#" className="p-talk-card-button__active mdl-color--indigo-500 mdl-color-text--white" onClick={e => this.handleClickOpen(e)}>
            <i className="material-icons">play_circle_filled</i>
          </a>
        }
        { this.props.i !== 0 &&
          <header className="p-talk-card-button mdl-color--teal-100 mdl-color-text--white" />
        }
      </section>
    );
  }
}

Talk.contextTypes = {
  store: PropTypes.object,
};

Talk.propTypes = {
  talk: PropTypes.instanceOf(Immutable.Map).isRequired,
  i: PropTypes.number.isRequired,
};
