import React from 'react';

const NoEntry = () => {
  const height = window.innerHeight - 150;
  return (
    <div className="p-talk-body__no-entry" style={{ height }}>
      <h2 className="p-talk-sign__no-entry">
        No entry...<br />
        Let&apos;s entry your talk!
      </h2>
    </div>
  );
};
export default NoEntry;
