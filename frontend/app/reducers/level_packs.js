import { GET_LEVEL_PACKS } from '../constants/action_types'

const initialState = {
  all:     [],
  current: {},
}

export default function level_packs(state = initialState, action) {
  switch (action.type) {
    case 'SET_LEVEL_PACKS':
      return {  ...state, all: action.payload };

    case 'SET_LEVEL_PACK':
      return {  ...state, current: action.payload };

    default:
      return state;
  }
}
