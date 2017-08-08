import Immutable from 'immutable';

const TalkBase = Immutable.Record({
  entries: new Immutable.List(),
});

export default class Talk extends TalkBase {
}
