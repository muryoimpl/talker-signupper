import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

export default class Talk extends React.Component {
  handleClickStart(e) {
    e.preventDefault();
    // TODO: write something to start talk
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
          <a href="#" className="p-talk-card-button__active mdl-color--indigo-500 mdl-color-text--white" onClick={e => this.handleClickStart(e)}>
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

Talk.propTypes = {
  talk: PropTypes.instanceOf(Immutable.Map).isRequired,
  i: PropTypes.number.isRequired,
};
