import {
  ACTION_GET_LEVEL
} from '../constants/action_types'

const initialState = {
  current: {},
}

export default function levelReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_GET_LEVEL:
      return {  ...state, current: action.payload };

    default:
      return state;
  }
}
