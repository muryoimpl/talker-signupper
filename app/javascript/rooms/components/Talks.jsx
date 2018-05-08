import { connect } from 'react-redux';
import * as talkActions from '../actions/talks';
import * as dialogsActions from '../actions/dialogs';
import * as globalActions from '../actions/globals';

import TalksLayout from './presentationals/TalksLayout';

const mapStateToProps = state => ({
  entries: state.talks.entries,
  done: state.talks.done,
  loading: state.talks.loading,
});

const actionForReceivedJSON = (dispatch, response) => {
  switch (response.action) {
    case 'create-talk':
      dispatch(talkActions.addTalk(response.talk));
      break;
    case 'shuffled-talks':
      dispatch(talkActions.setTalks(response.room.talks));
      break;
    default:
      console.error(`unknown action: ${response.action}`); // eslint-disable-line no-console
  }
};

const mapDispatchToProps = dispatch => ({
  showLoading: (load) => {
    dispatch(talkActions.loading(load));
  },
  fetchTalks: (entries) => {
    if (!entries || entries.size === 0) {
      dispatch(talkActions.fetchTalks());
    }
  },
  changeSocketState: (state) => {
    dispatch(globalActions.changeSocketState(state));
  },
  receiveJSON: (data) => {
    const response = JSON.parse(data);

    if (response.error) {
      dispatch(dialogsActions.showDialog(response.error));
      return;
    }

    actionForReceivedJSON(dispatch, response);
  },
});

const Talks = connect(mapStateToProps, mapDispatchToProps)(TalksLayout);
export default Talks;
