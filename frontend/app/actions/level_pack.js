import { GET_LEVEL_PACKS } from '../constants/action_types'
import { connect } from 'react-redux';

export function fetchLevelPacks() {
  return (dispatch) => {
    $.get('http://localhost:3000/api/v1/level_packs', function (result) {
      dispatch({
        type:    'SET_LEVEL_PACKS',
        payload: result
      })
    })
  };
}
