import { createSelector } from 'reselect';

import { OK, ERROR_REQUIRED, ERROR_TOO_SHORT } from '../constants/validationStatus';
import { isOK } from './validator';

function validatePassword(password) {
  if (!password) return ERROR_REQUIRED;
  if (password.length < 6) return ERROR_TOO_SHORT;

  return OK;
}

const passwordSelector = createSelector(
  state => state.password,
  password => validatePassword(password),
);

const authorizationFormSelector = createSelector(
  passwordSelector,
  password => (!![password].every(status => isOK(status))),
);

export default authorizationFormSelector;
