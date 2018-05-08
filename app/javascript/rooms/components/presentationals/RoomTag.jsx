import React from 'react';
import PropTypes from 'prop-types';

const RoomTag = ({ roomName }) => (
  <span className="p-room__room-name">
    <a className="p-room__room-name-link" href={window.location.href}>#{roomName}</a>
  </span>

);

RoomTag.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default RoomTag;
