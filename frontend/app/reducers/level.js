import {
  ACTION_GET_LEVEL,
  ACTION_GAME_INCREMENT_STEPS
} from '../constants/action_types'

const initialState = {
  current: {},
  steps:   0,
}

export default function levelReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_GET_LEVEL:
      return {  ...state, current: action.payload };

    case ACTION_GAME_INCREMENT_STEPS:
      return {  ...state, steps: state.steps + 1 };

    default:
      return state;
  }
}
