import React from 'react';
import PropTypes from 'prop-types';

class Spinner extends React.Component {
  componentDidUpdate() {
    const spinner = document.getElementById('spinner');
    // NOTE: `componentHandler.upgradeElement(el)` need to render mdl-js-spinner while it's not "loading" event.
    if (spinner) window.componentHandler.upgradeElement(spinner);
  }

  render() {
    const { height } = this.props;
    return (
      <div className="p-talk-body__no-entry" style={{ height }}>
        <div id="spinner" className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
      </div>
    );
  }
}

Spinner.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Spinner;
