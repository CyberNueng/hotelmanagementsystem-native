import { AsyncStorage } from 'react-native'
import api from '../api'

const RNFS = require('react-native-fs');

const path = RNFS.DocumentDirectoryPath + '/token.txt';

const tokenName = 'token';

/*function AddToken(token){
  RNFS.writeFile(path, token, 'utf8')
  .then((success) => {
    console.log('FILE WRITTEN!');
  })
  .catch((err) => {
    console.log(err.message);
  });
}*/
async function AddToken(token){
  await AsyncStorage.setItem(tokenName, token);
  console.log("set token complete")
}

class TokenService {
  requestToken(email, password) {
    return api.login(email, password).then(
      res => {
        const token = res.data.token
        AddToken(token);
        return res;
      },
      res => {
        return Promise.reject(res);
      }
    )
  }

  async revokeToken() {
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
  }
}

export default new TokenService();
