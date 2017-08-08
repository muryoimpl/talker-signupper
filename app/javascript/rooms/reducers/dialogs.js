import Dialog from '../models/dialog';
import * as Types from '../constants/actions';

export default function dialogs(dialog = new Dialog(), action) {
  switch (action.type) {
    case Types.SHOW_DIALOG:
      return dialog.merge({ isDisplay: true, message: action.message });
    case Types.CLOSE_DIALOG:
      return dialog.merge({ isDisplay: false, message: '' });
    default:
      return dialog;
  }
}
