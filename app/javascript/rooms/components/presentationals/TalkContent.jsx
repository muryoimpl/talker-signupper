import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

export default class TalkContent extends React.Component {
  handleClickOpen(e) {
    e.preventDefault();
    this.props.openTimer(this.props.talk);
    document.querySelector('dialog#timer-frame').showModal();
  }

  render() {
    const { i, talk, done } = this.props;
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

        { (i === 0 && !done) &&
          <a href="#" className="p-talk-card-button__active mdl-color--indigo-500 mdl-color-text--white" onClick={e => this.handleClickOpen(e)}>
            <i className="material-icons">play_circle_filled</i>
          </a>
        }
        { (i !== 0 || done) &&
          <header className={`p-talk-card-button mdl-color-text--white ${done ? 'mdl-color--grey-400' : 'mdl-color--teal-100'}`} />
        }
      </section>
    );
  }
}

TalkContent.defaultProps = {
  done: false,
  talk: Immutable.Map(),
};

TalkContent.propTypes = {
  talk: PropTypes.instanceOf(Immutable.Map),
  i: PropTypes.number.isRequired,
  done: PropTypes.bool,
  openTimer: PropTypes.func.isRequired,
};
