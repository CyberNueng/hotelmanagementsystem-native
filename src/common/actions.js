import constants from './constants'
import { createAction } from 'redux-actions'

const actions = {
  isLoading: add => createAction(constants.LOADING)(add),
  notifyMessageInfo: (header, message, timeout = 4000) => dispatch => {
    dispatch({ type: `SHOW_${constants.NOTIFY_MESSAGE}`, header, message })
    setTimeout(() => {
      dispatch({ type: `HIDE_${constants.NOTIFY_MESSAGE}` })
    }, timeout)
  }
}

export default actions
