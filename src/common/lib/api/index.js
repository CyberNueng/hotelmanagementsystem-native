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

  getPopular({ room })  {
    return api.get(`inventory/popular?limit=6&room=${room}`)
  },

  getRecommend({ room })  {
    return api.get(`inventory/recommend?limit=6&room=${room}`)
  },

  getNewItem({ room }) {
    return api.get(`inventory/newitem?limit=5&room=${room}`)
  },

  getAllItem({ room }) {
    return api.get(`inventory/allitem?room=${room}`)
  },

  getOnlyYou({ room }) {
    return api.get(`inventory/onlyyou?room=${room}`)
  },

  requestItem({ username, itemID, amount }) {
    return api.put(`inventory/request/${itemID}`, { username, itemID, amount });
  },
  
  repair({ username, itemID }) {
    return api.put(`inventory/repair/${itemID}`, { username, ItemID });
  },
}
