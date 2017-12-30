import Immutable from 'immutable';

const GlobalBase = Immutable.Record({
  connected: false,
});

export default class Global extends GlobalBase {
}
