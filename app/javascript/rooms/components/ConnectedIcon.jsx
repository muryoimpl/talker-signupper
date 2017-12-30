import React from 'react';

const ConnectedIcon = ({ connected }) => {
  return (
    <i className="material-icons p-header__badge">{ connected ? 'sync' : 'sync_disabled' }</i>
  )
}

export default ConnectedIcon;
