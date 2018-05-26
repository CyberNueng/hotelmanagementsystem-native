import Api from '../../common/lib/api'
import constants from './constants'
import createApiAction from '../../common/lib/api/createAction'

const itemInfoApiAction = createApiAction(constants.ITEM_INFO, { setLoading: true })
const popularApiAction = createApiAction(constants.POPULAR, { setLoading: true })
const requestApiAction = createApiAction(constants.REQUEST, { setLoading: true })
const newItemApiAction = createApiAction(constants.NEW_ITEM, { setLoading: true })
const allItemApiAction = createApiAction(constants.ALL_ITEM, { setLoading: true })

const actions = {
  getItemInfo: ({ itemID }) => itemInfoApiAction.fetch(Api.getItemInfo, { itemID }),
  getPopular: ({ room }) => popularApiAction.fetch(Api.getPopular, { room }),
  getNewItem: ({ room }) => newItemApiAction.fetch(Api.getNewItem, { room }),
  getAllItem: ({ room }) => allItemApiAction.fetch(Api.getAllItem, { room }),
  requestItem: ({ username, itemID, amount }) => requestApiAction.request(Api.requestItem, { username, itemID, amount })
}

export default actions