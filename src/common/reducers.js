import { handleAction, handleActions } from 'redux-actions'

import { combineReducers } from 'redux'
import constants from './constants'

const reducers = combineReducers({
  isLoading: handleAction(
    constants.LOADING,
    (state, action) => {
      if (action.payload == true) {
        return state + 1
      }
      return state - 1
    },
    0
  ),
  notifyMessage: handleActions(
    {
      [`SHOW_${constants.NOTIFY_MESSAGE}`]: (state, action) => {
        const { message, header } = action
        if (state.isActive) return state
        return { isActive: true, message, header }
      },
      [`HIDE_${constants.NOTIFY_MESSAGE}`]: state => {
        return { ...state, isActive: false }
      }
    },
    { isActive: false, message: '', header: '' }
  )
})

export default reducers
