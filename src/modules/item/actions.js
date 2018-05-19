import Api from '../../common/lib/api'
import constants from './constants'
import createApiAction from '../../common/lib/api/createAction'

const itemInfoApiAction = createApiAction(constants.ITEM_INFO, { setLoading: true })
const popularApiAction = createApiAction(constants.POPULAR, { setLoading: true })

const actions = {
  getItemInfo: ({ itemID }) => itemInfoApiAction.fetch(Api.getItemInfo, { itemID }),
  getPopular: () => popularApiAction.fetch(Api.getPopular)
}

export default actions