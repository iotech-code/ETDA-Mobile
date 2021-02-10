import axios from 'axios'
import { apiServer } from '../constant/util';
import AsyncStorage from '@react-native-async-storage/async-storage';


class HttpRequest {
  constructor() {

    // this.axios = axios
    this.axiosInstance = axios.create({
      baseURL: apiServer.url,
      timeout: 120000,
    })

    this.axiosInstance.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(function (response) {
      // Do something with response data
      return response
    }, function (error) {
      // Do something with response error
      return Promise.reject(error)
    })

  }

  setHeader(header) {
    // this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.common = header
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  async autoSetTokenHeader() {
    const token = await AsyncStorage.getItem('token');
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  get(url, data) {
    return this.axiosInstance.get(url, {
      params: data
    })
  }

  post(methodName, data) {
    return this.axiosInstance.post(methodName, data)
  }

  update(url, data) {
    return this.axiosInstance.put(url, data)
  }

  delete(url, param, data) {
    return this.axiosInstance.delete(url, {
      params: param,
      data: data
    })
  }

  request(type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default: promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}
export default HttpRequest