import { createSelector } from 'reselect';

import { OK, ERROR_REQUIRED } from '../constants/validationStatus';
import { isOK } from './validator';

function validateTitle(title) {
  if (!title) return ERROR_REQUIRED;

  return OK;
}

function validateTalkerName(talkerName) {
  if (!talkerName) return ERROR_REQUIRED;

  return OK;
}

const titleSelector = createSelector(
  state => state.title,
  title => validateTitle(title),
);

const talkerNameSelector = createSelector(
  state => state.talker_name,
  talkerName => validateTalkerName(talkerName),
);

const signupFormSelector = createSelector(
  titleSelector,
  talkerNameSelector,
  (title, talkerName) => (!![title, talkerName].every(status => isOK(status))),
);

export default signupFormSelector;
