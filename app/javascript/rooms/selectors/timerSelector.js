import { createSelector } from 'reselect';

function getRemainings(remaining) {
  if (!remaining || remaining <= 0) return [0, 0];

  const mins = Math.floor(remaining / (1000 * 60));
  const secs = Math.ceil((remaining % (1000 * 60)) / 1000);

  return secs === 60 ? [mins + 1, 0] : [mins, secs];
}

export const timeSelector = createSelector(
  state => state.remaining,
  remaining => getRemainings(remaining),
);

export const MIN = 0;
export const SEC = 1;

const timerSelector = createSelector(
  timeSelector,
);

export default timerSelector;
