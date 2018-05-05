import { combineReducers } from 'redux'
import constants from './constants'
import createApiReducer from '../../common/lib/api/createReducer'

const reducers = combineReducers({
  loginStatus: createApiReducer(constants.LOGIN),
  logoutStatus: createApiReducer(constants.LOGOUT),
  me: createApiReducer(constants.ME)
})

export default reducers
