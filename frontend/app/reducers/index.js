import { combineReducers } from 'redux'
import levelPackReducer from './level_pack'

export default combineReducers({
  levelPackState: levelPackReducer
})
