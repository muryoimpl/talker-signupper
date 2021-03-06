import { OK } from '../constants/validationStatus';

export function isOK(status) {
  switch (status) {
    case OK:
      return true;
    default:
      return false;
  }
}

export function isError(status) {
  return !isOK(status);
}
