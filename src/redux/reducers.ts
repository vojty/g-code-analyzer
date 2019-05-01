import { combineReducers } from 'redux'

import { fileReducer, State } from './fileReducer'

export type AppState = {
  file: State
}

export default combineReducers({ file: fileReducer })
