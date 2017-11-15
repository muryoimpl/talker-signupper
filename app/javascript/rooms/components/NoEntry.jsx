import React from 'react';

export default class NoEntry extends React.Component {
  render() {
    const height = window.innerHeight - 150;
    return (
      <div className="p-talk-body__no-entry" style={{ height }}>
        <h2 className="p-talk-sign__no-entry">
          No entry...<br />
          Let&apos;s entry your talk!
        </h2>
      </div>
    );
  }
}
