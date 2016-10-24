import { GET_LEVEL_PACKS } from '../constants/action_types'

const initialState = []

export default function level_packs(state = initialState, action) {
  switch (action.type) {
    case 'SET_LEVEL_PACKS':
      return action.payload;

    default:
      return state;
  }
}
