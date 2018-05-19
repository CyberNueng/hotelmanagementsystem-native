import { combineReducers } from 'redux'
import constants from './constants'
import createApiReducer from '../../common/lib/api/createReducer'

const reducers = combineReducers({
  itemInfo: createApiReducer(constants.ITEM_INFO, {}),
  popularItem: createApiReducer(constants.POPULAR, [])
})

export default reducers