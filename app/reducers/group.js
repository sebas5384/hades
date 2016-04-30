import {
  SYNC_ITEMS,
  ADD,
  REMOVE,
  SAVE
} from '../actions/shell'

const initialState = {
  items: [],
  showing: 'sebas'
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case SYNC_ITEMS:

      const duplicatedGroups = action.payload
        .filter(item => item.host.indexOf('.'))
        .map(item => item.host.split('.')[0])

      const uniqueGroups = duplicatedGroups
        .reduce((prev, current) => {

          const isDuplicated = prev
            .filter(item => item === current)

          if (isDuplicated.length) {
            return prev
          }

          return [
            ...prev,
            current
          ]

        }, ['all'])

      return {
        ...state,
        items: uniqueGroups
      }

    default:
      return state
  }
}

const mockItems = [
  {name: 'sebas'},
  {name: 'kickante'},
  {name: 'revax'},
  {name: 'taller'},
  {name: 'natura'}
]
