import api from './manager'

export default {
  // Auth & User Module
  getMe() {
    return api.get('/accounts/me');
  },

  login(username, password) {
    return api.post('/auth/', { username, password });
  },

  logout() {
    return api.get('/accounts/logout');
  },
}
