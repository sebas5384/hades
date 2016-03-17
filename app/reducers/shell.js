import ConfigFile from '../lib/ConfigFile';

import {
  LOAD,
  ADD,
  SAVE,
  REMOVE,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM
} from '../actions/shell';

const initialState = {
  items: [],
  showAddForm: true
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD:

      // @TODO: Avoid duplicated.

      const items = state.items.concat(action.payload);
      const newState = {
        ...state,
        items: items
      };

      // Sync to config file.
      // @TODO: Should have an action.
      const configFile = ConfigFile();
      const updatedContent = configFile.update(items);
      configFile.sync(updatedContent);

      return newState;

    case SHOW_ADD_FORM:
      return {
        ...state,
        showAddForm: true
      }

    case HIDE_ADD_FORM:
      return {
        ...state,
        showAddForm: false
      }

    default:
      return state;
  }
}
