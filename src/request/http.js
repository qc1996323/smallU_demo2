// 1.引入依赖
import axios from "axios"
import qs from "qs"
import Vue from "vue"
import {errorAlert} from "../utils/alert"

// 2.环境
if (process.env.NODE_ENV == 'development') {
    Vue.prototype.$pre = "http://localhost:3000"
}

if (process.env.NODE_ENV == 'production') {
    Vue.prototype.$pre = ""
}

// 3.请求拦截
axios.interceptors.request.use(config => {
    //不确定

    return config;
})

// 4.响应拦截
axios.interceptors.response.use(res => {
    //不确定
    console.log("请求地址："+res.config.url);
    console.log(res);

    //统一弹失败信息
    if(res.data.code!==200){
        errorAlert(res.data.msg)
    }
    return res;
})

// 5.get 
export let get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            resolve(res)
        })
    })
}

// 6.post 
export let post = (url, params, isFile = false) => {
    let data = null;
    if (isFile) {
        data = new FormData()
        for (let i in params) {
            data.append(i, params[i])
        }
    } else {
        data = qs.stringify(params);
    }

    return new Promise((resolve, reject) => {

        axios.post(url, data).then(res => {
            resolve(res)
        })
    })
}

