export const FILTER = 'group/FILTER'

export function filter(name) {
  return {
    type: FILTER,
    payload: name
  }
}
