import fs from 'fs'

export const LOAD = 'shell/LOAD'
export const ADD = 'shell/ADD'
export const SAVE = 'shell/SAVE'
export const REMOVE = 'shell/REMOVE'

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
