import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

createStore(
  (state, action) => {
    return { a: 11, b: 22 }
  },
  { a: 1, b: 2 },
  applyMiddleware(thunk)
)