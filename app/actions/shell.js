import fs from 'fs'

export const LOAD = 'shell/LOAD'
export const ADD = 'shell/ADD'
export const SAVE = 'shell/SAVE'
export const REMOVE = 'shell/REMOVE'
export const SHOW_ADD_FORM = 'shell/ADD/form/SHOW'
export const HIDE_ADD_FORM = 'shell/ADD/form/HIDE'

export function load(id) {
  return {
    type: LOAD
  }
}

export function add(data) {
  // @TODO: Actions of config file updating.
  return {
    type: ADD,
    payload: data
  }
}

export function save(data) {
  return {
    type: SAVE
  }
}

export function remove(id) {
  return {
    type: REMOVE
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
