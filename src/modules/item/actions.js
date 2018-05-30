import Api from '../../common/lib/api'
import constants from './constants'
import createApiAction from '../../common/lib/api/createAction'

const itemInfoApiAction = createApiAction(constants.ITEM_INFO, { setLoading: true })
const popularApiAction = createApiAction(constants.POPULAR, { setLoading: true })
const recommendApiAction = createApiAction(constants.RECOMMEND, { setLoading: true })
const requestApiAction = createApiAction(constants.REQUEST, { setLoading: true })
const newItemApiAction = createApiAction(constants.NEW_ITEM, { setLoading: true })
const allItemApiAction = createApiAction(constants.ALL_ITEM, { setLoading: true })
const repairApiAction = createApiAction(constants.REPAIR, { setLoading: true })
const guesthistoryApiAction = createApiAction(constants.GUEST_HISTORY, { setLoading: true })
const cancelRequestApiAction = createApiAction(constants.CANCEL_REQUEST, { setLoading: true })
const onlyYouApiAction = createApiAction(constants.ONLY_YOU, { setLoading: true })

const actions = {
  getItemInfo: ({ itemID }) => itemInfoApiAction.fetch(Api.getItemInfo, { itemID }),
  getPopular: ({ room }) => popularApiAction.fetch(Api.getPopular, { room }),
  getRecommend: ({ room }) => recommendApiAction.fetch(Api.getRecommend, { room }),
  getNewItem: ({ room }) => newItemApiAction.fetch(Api.getNewItem, { room }),
  getAllItem: ({ room }) => allItemApiAction.fetch(Api.getAllItem, { room }),
  requestItem: ({ username, itemID, amount }) => requestApiAction.request(Api.requestItem, { username, itemID, amount }),
  repair: ({ username, itemID }) => repairApiAction.request(Api.repair, { username, itemID }),
  getGuesthistory: ({ room }) => guesthistoryApiAction.fetch(Api.getGuesthistory, { room }),
  cancelRequest: ({ reqID, username }) => cancelRequestApiAction.request(Api.cancelRequest, { reqID, username }),
  getOnlyYou: ({ room }) => onlyYouApiAction.fetch(Api.getOnlyYou, { room }),
}

export default actions