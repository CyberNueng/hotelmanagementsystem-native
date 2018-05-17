import * as httpStatus from 'http-status'

import { AsyncStorage } from 'react-native'
import _ from 'lodash'
import axios from 'axios'
import objectToForm from '../utils/objectToForm'
import snakeize from 'snakeize'

const RNFS = require('react-native-fs');
const path = RNFS.DocumentDirectoryPath + '/wtf.txt';
const camelcaseKeys = require('camelcase-keys');

const datePattern = [/^\d{4}-\d{2}-\d{2}$/, /^\d{2}-\d{2}-\d{4}$/, /^\d{4}\/\d{2}\/\d{2}$/, /^\d{2}\/\d{2}\/\d{4}$/];
var token;

//use file system because i can't solve Asynstorage not fulfill on android7+ T_T
function readToken(){
  RNFS.readFile(path, 'utf8')
    .then((contents) => {
      token = `JWT ${contents}`;
    }).catch((err) => {
      token = null
    });
}

const api = axios.create({
  baseURL: "http://171.7.183.57:8000/api",
  transformRequest: axios.defaults.transformRequest.concat((data, headers) => {
    readToken();
    if (token) {
      headers['Authorization'] = token;
    }
    return data;
  }),
  transformResponse: axios.defaults.transformResponse.concat(data => {
    return camelcaseKeys(data || {}, { deep: true, exclude: [...datePattern] });
  }),
});

const verbs = ['get', 'post', 'put', 'patch', 'delete'];

class ApiManager {}

function handleSuccess(res) {
  if (httpStatus.NO_CONTENT == res.status) {
    return {
      success: true
    }
  }
  return {
    data: res.data,
    code: res.status
  }
}

function handleFailed(error) {
  const res = error.response
  return Promise.reject({
    data: res.data || {},
    code: res.status
  })
}

function preparePostFiles(data, files) {
  try {
    const formData = objectToForm(files)
    formData.append('payload', JSON.stringify(snakeize(data)))
    return formData;
  } catch (e) {
    return undefined;
  }
}

/* handle each verb here */
for (let verb of verbs) {
  if (!_.includes(['get', 'delete'], verb)) {
    ApiManager.prototype[`${verb}WithFiles`] = function(url, data, files, config = {}) {
      const postData = preparePostFiles(data, files);
      config = Object.assign({ headers: { 'Content-Type': 'multipart/form-data' } }, config);
      if (config && config.params) config.params = snakeize(config.params)
      return api[verb](url, postData, config).then(handleSuccess, handleFailed);
    }

    ApiManager.prototype[verb] = function(url, data, config) {
      if (config && config.params) config.params = snakeize(config.params)
      return api[verb](url, snakeize(data), config).then(handleSuccess, handleFailed);
    }
  } else {
    ApiManager.prototype[verb] = async function(url, config) {
      if (config && config.params) config.params = snakeize(config.params)
      return api[verb](url, config).then(handleSuccess, handleFailed);
    }
  }
}

export default new ApiManager();
