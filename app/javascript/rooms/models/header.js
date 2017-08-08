import Immutable from 'immutable';

const HeaderBase = Immutable.Record({
  signup: 'open',
  roomName: '',
});

export default class Header extends HeaderBase {
}
