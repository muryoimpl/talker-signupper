import Immutable from 'immutable';

const TalkBase = Immutable.Record({
  entries: new Immutable.List(),
  done: new Immutable.List(),
  loading: true,
  current: new Immutable.Map(),
});

export const progress = {
  entried: { value: 0, key: 'entried' },
  oneFifths: { value: 1, key: 'oneFifths' },
  twoFifths: { value: 2, key: 'twoFifths' },
  threeFifths: { value: 3, key: 'threeFifths' },
  fourFifths: { value: 4, key: 'fourFifths' },
  done: { value: 5, key: 'done' },
};

export default class Talk extends TalkBase {
}
