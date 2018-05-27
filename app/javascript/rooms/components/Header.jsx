import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import * as actions from '../actions/headers';
import * as signupActions from '../actions/signups';
import * as talkActions from '../actions/talks';
import { wait } from '../utils/timer';
import HeaderContent from './presentationals/HeaderContent';

const mapStateToProps = state => ({
  roomName: state.headers.roomName,
  authorized: state.authorization.authorized,
  connected: state.globals.connected,
});

const mapDispatchToProps = dispatch => ({
  setRoomName: (roomName) => {
    dispatch(actions.setRoomName(roomName));
  },
  showSignUpDialog: () => {
    dispatch(signupActions.updateDialogOpen(true));
  },
  backToRootPage: /* istanbul ignore next */() => {
    const history = createHistory();
    history.push('/');
    history.go();
  },
  shuffleOrder: async () => {
    dispatch(talkActions.loading(true));
    dispatch(talkActions.shuffleOrder());
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'test') await wait(1000);
    dispatch(talkActions.loading(false));
  },
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContent);

export default Header;
