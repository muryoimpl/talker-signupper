import Immutable from 'immutable';

const TalkBase = Immutable.Record({
  entries: new Immutable.List(),
  done: new Immutable.List(),
  loading: true,
});

export default class Talk extends TalkBase {
}
