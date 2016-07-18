import fs from 'fs'
import uuid from 'uuid'
import ConfigFile from '../lib/ConfigFile';

export const LOAD = 'shell/LOAD'
export const SYNC_ITEMS = 'shell/SYNC_ITEMS'
export const ADD = 'shell/ADD'
export const SAVE = 'shell/SAVE'
export const REMOVE = 'shell/REMOVE'
export const SHOW_ADD_FORM = 'shell/ADD/form/SHOW'
export const HIDE_ADD_FORM = 'shell/ADD/form/HIDE'
export const SHOW_EDIT_FORM = 'shell/EDIT/form/SHOW'
export const HIDE_EDIT_FORM = 'shell/EDIT/form/HIDE'

export function load(id) {
  return {
    type: LOAD,
    payload: {id}
  }
}

export function addAndSyncToLocal(data) {
  return (dispatch, getState) => {

    // Add new item to the state.
    dispatch(add(data))

    // Get items from state after the add.
    const items = getState().shell.items

    dispatch(syncToLocal(items))
  }
}

export function saveAndSyncToLocal(data) {
  return (dispatch, getState) => {

    // Save changed item to the state.
    dispatch(save(data))

    // Get items from state after the save.
    const items = getState().shell.items

    dispatch(syncToLocal(items))
  }
}

export function removeAndSyncToLocal(data) {
  return (dispatch, getState) => {

    // Save changed item to the state.
    dispatch(remove(data))

    // Get items from state after the save.
    const items = getState().shell.items

    dispatch(syncToLocal(items))
  }
}

export function add(data) {
  return {
    type: ADD,
    payload: {
      ...data,
      id: uuid.v4()
    }
  }
}

export function syncToLocal(items) {
  const configFile = ConfigFile()

  var updatedContent = configFile.update(items);
  configFile.sync(updatedContent);

  return {
    type: SYNC_ITEMS,
    payload: items
  }
}

export function syncFromLocal() {
  const configFile = ConfigFile()
  try {
    const localConfigItems = configFile.loadFromLocal()
    return {
      type: SYNC_ITEMS,
      payload: localConfigItems
    }
  }
  catch (e) {
    configFile.sync('# Created by Hades.')

    return {
      type: SYNC_ITEMS,
      payload: []
    }
  }

}

export function save(data) {
  return {
    type: SAVE,
    payload: data
  }
}

export function remove(id) {
  return (dispatch, getState) => {

    // Show add form when is the last item.
    if (getState().shell.items.length === 1) {
      dispatch(showAddForm())
    }

    return dispatch({
      type: REMOVE,
      payload: {id}
    })
  }
}

export function showAddForm() {
  return {
    type: SHOW_ADD_FORM
  }
}

export function hideAddForm() {
  return {
    type: HIDE_ADD_FORM
  }
}

export function showEditForm(id) {
  return {
    type: SHOW_EDIT_FORM,
    payload: {
      id
    }
  }
}

export function hideEditForm() {
  return {
    type: HIDE_EDIT_FORM
  }
}
