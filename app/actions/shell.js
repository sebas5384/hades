import fs from 'fs'
import uuid from 'uuid'
import ConfigFile from '../lib/ConfigFile';

export const LOAD = 'shell/LOAD'
export const SYNC_FROM_LOCAL = 'shell/SYNC_FROM_LOCAL'
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

export function add(data) {
  return {
    type: ADD,
    payload: {
      ...data,
      id: uuid.v4()
    }
  }
}

export function syncFromLocal() {
  const configFile = ConfigFile()
  const localConfigItems = configFile.loadFromLocal()

  return {
    type: SYNC_FROM_LOCAL,
    payload: localConfigItems
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
