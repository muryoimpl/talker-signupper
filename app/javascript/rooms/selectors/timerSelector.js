import { createSelector } from 'reselect';

function getRemainingMins(remaining) {
  if (!remaining || remaining <= 0) return 0;
  const mins = Math.floor(remaining / (1000 * 60));
  return mins;
}

function getRemainingSecs(remaining) {
  if (!remaining || remaining <= 0) return 0;
  const secs = Math.ceil(
    (remaining % (1000 * 60)) / 1000,
  );
  return secs === 60 ? 0 : secs;
}

export const minsSelector = createSelector(
  state => state.remaining,
  remaining => getRemainingMins(remaining),
);

export const secsSelector = createSelector(
  state => state.remaining,
  remaining => getRemainingSecs(remaining),
);

const timerSelector = createSelector(
  minsSelector,
  secsSelector,
);

export default timerSelector;
