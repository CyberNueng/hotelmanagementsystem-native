import Api from '../../common/lib/api'
import constants from './constants'
import createApiAction from '../../common/lib/api/createAction'

const itemInfoApiAction = createApiAction(constants.ITEM_INFO, { setLoading: true })
const popularApiAction = createApiAction(constants.POPULAR, { setLoading: true })
const requestApiAction = createApiAction(constants.REQUEST, { setLoading: true })

const actions = {
  getItemInfo: ({ itemID }) => itemInfoApiAction.fetch(Api.getItemInfo, { itemID }),
  getPopular: () => popularApiAction.fetch(Api.getPopular),
  requestItem: ({ username, itemID, amount }) => requestApiAction.request(Api.requestItem, { username, itemID, amount })
}

export default actions