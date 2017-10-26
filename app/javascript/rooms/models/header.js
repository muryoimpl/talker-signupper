import Immutable from 'immutable';

const HeaderBase = Immutable.Record({
  roomName: '',
});

export default class Header extends HeaderBase {
}
