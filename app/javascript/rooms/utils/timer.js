/* eslint-disable import/prefer-default-export */
export function wait(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

export function zeroPad(value) {
  return `0${value}`.slice(-2);
}
