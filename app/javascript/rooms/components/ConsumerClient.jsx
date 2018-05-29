import { connect } from 'react-redux';

import * as talkActions from '../actions/talks';
import * as dialogsActions from '../actions/dialogs';
import * as globalActions from '../actions/globals';
import NotificationReceiver from './presentationals/NotificationReceiver';

const mapStateToProps = state => state;

export const actionForReceivedJSON = (dispatch, response) => {
  switch (response.action) {
    case 'create-talk':
      dispatch(talkActions.addTalk(response.talk));
      break;
    case 'shuffled-talks':
      dispatch(talkActions.setTalks(response.room.talks));
      break;
    case 'update-progress':
      dispatch(talkActions.updateProgress(response.id, response.progress));
      break;
    default:
      console.error(`unknown action: ${response.action}`); // eslint-disable-line no-console
  }
};

export const mapDispatchToProps = dispatch => ({
  receiveJSON: (data) => {
    const response = JSON.parse(data);

    if (response.error) {
      dispatch(dialogsActions.showDialog(response.error));
      return;
    }

    actionForReceivedJSON(dispatch, response);
  },
  changeSocketState: (bool) => {
    dispatch(globalActions.changeSocketState(bool));
  },
});

const ConsumerClient = connect(mapStateToProps, mapDispatchToProps)(NotificationReceiver);
export default ConsumerClient;
