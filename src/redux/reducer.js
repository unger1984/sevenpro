import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import popular from '../ducks/popular'
import suggest from '../ducks/suggest'
import search from '../ducks/search'

const createRootReducer = history => combineReducers({
  popular,
  suggest,
  search,
  router: connectRouter(history),
})

export default createRootReducer
