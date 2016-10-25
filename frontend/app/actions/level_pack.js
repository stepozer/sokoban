import { GET_LEVEL_PACKS } from '../constants/action_types'
import { connect } from 'react-redux';

export function fetchLevelPack(id, page = 1) {
  return (dispatch) => {
    $.get('http://localhost:3000/api/v1/level_packs/'+id, function (result) {
      dispatch({
        type:    'SET_LEVEL_PACK',
        payload: result
      })
    })
  };
}

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
