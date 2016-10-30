import {
  ACTION_GET_LEVEL
} from '../constants/action_types'
import { connect } from 'react-redux';
import axios from 'axios';

export function fetchLevel(id) {
  return (dispatch) => {
    axios.get('/api/v1/levels/'+id)
      .then(function (response) {
        dispatch({ type: ACTION_GET_LEVEL, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
