import {
  ACTION_GET_LEVEL_PACKS,
  ACTION_GET_LEVEL_PACK
} from '../constants/action_types'

const initialState = {
  all:     [],
  current: {},
}

export default function levelPackReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_GET_LEVEL_PACKS:
      return {  ...state, all: action.payload };

    case ACTION_GET_LEVEL_PACK:
      return {  ...state, current: action.payload };

    default:
      return state;
  }
}
