import {
  ACTION_GET_LEVEL,
  ACTION_GET_LEVEL_SPRITES,
  ACTION_GAME_INCREMENT_STEPS
} from '../constants/action_types'
import { connect } from 'react-redux';
import axios from 'axios';

export function fetchLevel(id) {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/levels/'+id)
      .then(function (response) {
        dispatch({ type: ACTION_GET_LEVEL, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function fetchLevelSprites() {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/levels/sprites')
      .then(function (response) {
        dispatch({ type: ACTION_GET_LEVEL_SPRITES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function gameIncrementSteps(id) {
  return { type: ACTION_GAME_INCREMENT_STEPS };
}
