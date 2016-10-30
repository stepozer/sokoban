import { combineReducers } from 'redux'
import levelPackReducer from './level_pack'
import levelReducer from './level'

export default combineReducers({
  levelPackState: levelPackReducer,
  levelState:     levelReducer
})
