import ConfigFile from '../lib/ConfigFile';

import {
  LOAD,
  ADD,
  SAVE,
  REMOVE
} from '../actions/shell';

const initialState = {
  items: []
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

    default:
      return state;
  }
}
