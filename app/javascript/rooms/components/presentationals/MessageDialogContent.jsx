import React from 'react';
import PropTypes from 'prop-types';

export default class DialogContent extends React.Component {
  componentDidMount() {
    if (this.props.isDisplay) this.props.handleShowDialog();
  }

  componentDidUpdate() {
    if (this.props.isDisplay) this.props.handleShowDialog();
  }

  render() {
    return (
      <dialog id="dialog" className="mdl-dialog">
        <div className="mdl-dialog__content">
          <p >{this.props.message}</p>
        </div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button close" onClick={e => this.props.handleClickClose(e)}>Close</button>
        </div>
      </dialog>
    );
  }
}

DialogContent.propTypes = {
  message: PropTypes.string,
  isDisplay: PropTypes.bool,
  handleShowDialog: PropTypes.func.isRequired,
  handleClickClose: PropTypes.func.isRequired,
};

DialogContent.defaultProps = {
  message: '',
  isDisplay: false,
};
