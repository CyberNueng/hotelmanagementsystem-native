import { AsyncStorage } from 'react-native'
import api from '../api'

const RNFS = require('react-native-fs');

const path = RNFS.DocumentDirectoryPath + '/wtf.txt';

class TokenService {
  requestToken(email, password) {
    return api.login(email, password).then(
      res => {
        const token = res.data.token
        RNFS.writeFile(path, token, 'utf8');
        return res;
      },
      res => {
        return Promise.reject(res);
      }
    )
  }M

  /*async revokeToken() {
    return Promise.resolve(await AsyncStorage.removeItem(tokenName));
  }

  async isTokenExists() {
    const token = await AsyncStorage.getItem(tokenName);
    return !!token;
  }

  async tokenDidExpired() {
    await AsyncStorage.removeItem(tokenName);
    return true;
  }

  async getToken() {
    const value = await AsyncStorage.getItem(tokenName);
    return value;
  }*/
}

export default new TokenService();
