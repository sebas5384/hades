import ConfigFile from '../lib/ConfigFile';

import {
  LOAD,
  ADD,
  SAVE,
  REMOVE,
  SYNC_FROM_LOCAL,
  SHOW_ADD_FORM,
  HIDE_ADD_FORM,
  SHOW_EDIT_FORM,
  HIDE_EDIT_FORM
} from '../actions/shell';

const initialState = {
  items: [],
  showingAddForm: false,
  showingEditForm: false,
  editingHost: null
}

export default function reducer(state = initialState, action) {

  const configFile = ConfigFile()

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
      var updatedContent = configFile.update(items);
      // Sync to config file.
      configFile.sync(updatedContent);

      return newState;

    case SAVE:
      const newItems = state.items.map(shell => {
        return shell.id === action.payload.id ? { ...shell, ...action.payload } : shell
      })

      var updatedContent = configFile.update(newItems)
      // Sync to config file.
      configFile.sync(updatedContent)

      return {
        ...state,
        items: newItems
      }

    case REMOVE:
      const notRemovedItems = state.items.filter(shell => {
        return shell.id != action.payload.id
      })

      var updatedContent = configFile.update(notRemovedItems)
      // Sync to config file.
      configFile.sync(updatedContent)

      return {
        ...state,
        items: notRemovedItems
      }

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

    case SHOW_EDIT_FORM:
      return {
        ...state,
        showingEditForm: true,
        editingHost: action.payload.id
      }

    case HIDE_EDIT_FORM:
      return {
        ...state,
        showingEditForm: false
      }

    default:
      return state;
  }
}
