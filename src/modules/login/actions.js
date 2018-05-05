import Api from '../../common/lib/api'
import TokenService from '../../common/lib/token'
import constants from './constants'
import createApiAction from '../../common/lib/api/createAction'

const loginApiAction = createApiAction(constants.LOGIN, { setLoading: true })
const logoutApiAction = createApiAction(constants.LOGOUT)
const meApiAction = createApiAction(constants.ME, { setLoading: true })

const actions = {
  login: ({ username, password }) => loginApiAction.fetch(TokenService.requestToken, username, password),
  logout: () => logoutApiAction.fetch(TokenService.revokeToken),
  me: () => meApiAction.fetch(Api.getMe)
}

export default actions
