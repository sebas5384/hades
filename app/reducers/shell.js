import ConfigFile from '../lib/ConfigFile';

import {
  LOAD,
  ADD,
  SAVE,
  REMOVE,
  SYNC_FROM_LOCAL,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM
} from '../actions/shell';

const initialState = {
  items: [],
  showingAddForm: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:

      // @TODO: Avoid duplicated.

      const items = state.items.concat(action.payload);
      const newState = {
        ...state,
        items: items,
        initiallyOpen: true
      }

      // @TODO: Should have an action.
      const configFile = ConfigFile();
      const updatedContent = configFile.update(items);
      // Sync to config file.
      configFile.sync(updatedContent);

      return newState;

    case SYNC_FROM_LOCAL:
      return {
        ...state,
        items: action.payload,
        showingAddForm: action.payload.length === 0
      }

    case SHOW_ADD_FORM:
      return {
        ...state,
        showingAddForm: true
      }

    case HIDE_ADD_FORM:
      return {
        ...state,
        showingAddForm: false
      }

    default:
      return state;
  }
}
