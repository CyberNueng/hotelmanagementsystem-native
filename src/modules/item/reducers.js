import { combineReducers } from 'redux'
import constants from './constants'
import createApiReducer from '../../common/lib/api/createReducer'

const reducers = combineReducers({
  itemInfo: createApiReducer(constants.ITEM_INFO, {}),
  popularItem: createApiReducer(constants.POPULAR, []),
  recommend: createApiReducer(constants.RECOMMEND, []),
  newItem: createApiReducer(constants.NEW_ITEM, []),
  allItem: createApiReducer(constants.ALL_ITEM, []),
  guesthistory: createApiReducer(constants.GUEST_HISTORY, []),
})

export default reducers