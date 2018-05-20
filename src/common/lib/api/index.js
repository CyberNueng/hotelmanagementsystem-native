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
  // Item Module
  getItemInfo({ itemID }) {
    return api.get(`/inventory/iteminfo/?id=${itemID}`)
  },

  getPopular()  {
    return api.get('inventory/popular?limit=11')
  },

  getNewItem() {
    return api.get('inventory/newitem')
  },

  getAllItem() {
    return api.get('inventory/allitem')
  },

  getOnlyYou({ room }) {
    return api.get(`inventory/onlyyou?room=${room}`)
  },

  requestItem({ username, itemID, amount }) {
    return api.put(`inventory/request/${itemID}`, { username, itemID, amount });
  },
  //uncomplete
  repair({ username, itemID }) {
    return api.put(`inventory/repair/${itemID}`, { username, ItemID });
  },
}
