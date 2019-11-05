import axios from 'axios'
import qs from "qs"
import Vue from "vue"

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios

// axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.defaults.baseURL = "http://172.16.100.26:55840"
// 封装get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

// 封装post方法 qs将提交的参数对象进行序列化
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}