import { connect } from 'react-redux';
import * as talkActions from '../actions/talks';
import * as globalActions from '../actions/globals';

import TalksLayout from './presentationals/TalksLayout';

const mapStateToProps = state => ({
  entries: state.talks.entries,
  done: state.talks.done,
  loading: state.talks.loading,
});

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
});

const Talks = connect(mapStateToProps, mapDispatchToProps)(TalksLayout);
export default Talks;
