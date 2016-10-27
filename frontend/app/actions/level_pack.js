import {
  ACTION_GET_LEVEL_PACKS,
  ACTION_GET_LEVEL_PACK
} from '../constants/action_types'
import { connect } from 'react-redux';
import axios from 'axios';

export function fetchLevelPack(slug, page = 1) {
  return (dispatch) => {
    axios.get('/api/v1/level_packs/'+slug)
      .then(function (response) {
        dispatch({ type: ACTION_GET_LEVEL_PACK, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function fetchLevelPacks() {
  return (dispatch) => {
    axios.get('/api/v1/level_packs')
      .then(function (response) {
        dispatch({ type: ACTION_GET_LEVEL_PACKS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
