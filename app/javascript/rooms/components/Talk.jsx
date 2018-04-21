import { connect } from 'react-redux';
import * as timerActions from '../actions/timer';
import * as talkActions from '../actions/talks';
import TalkContent from './presentationals/TalkContent';

const mapStateToProps = state => ({}); // eslint-disable-line no-unused-vars
const mapDispatchToProps = dispatch => ({
  openTimer: (talk) => {
    dispatch(talkActions.pushToCurrent(talk));
    dispatch(timerActions.openTimer());
  },
});

const Talk = connect(mapStateToProps, mapDispatchToProps)(TalkContent);
export default Talk;
