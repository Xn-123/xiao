// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css"
// done 进度条结束 start 开始
// 引入store仓库数据
import store  from '@/store'

// 通过axios.create创建axios实例对象
const requests = axios.create({
    // 配置对象
    // 基础路径 : 发送路径时，默认以'/api开头再次进行拼接路径字符串
    baseURL:'/api',
    // 超时请求
    timeout:5000
});

//  请求拦截器： 发送请求前，设置它可以检测到，可以在请求发送出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // 
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    // config 配置对象
    return config;
});

//  响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    // 成功的回调函数
    return res.data;
},(error)=>{
    // 响应失败回调函数
    return Promise.reject(new Error(error));
});

// 对外暴露
export default requests;
