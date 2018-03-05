/* eslint-disable import/prefer-default-export */
export function wait(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}
