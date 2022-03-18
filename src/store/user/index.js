import { reqGetCodeByPhone , reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

const state = {
    // 用户唯一标示
    token:getToken(), 
    // 验证码
    code:'',
    // 用户信息
    userinfo:{}
};
const actions = {
    // 获取验证码
    async getCodeByPhone({ commit }, phone) {
        let result = await reqGetCodeByPhone(phone)
        if (result.code == 200) {
            commit('GETCODEBYPHONE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    // 用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    },
    // 获取用户信息
    async userInfo({commit}){
     let result = await reqUserInfo();
     if(result.code==200){
        commit('USERINFO',result.data)
        return 'ok'
     }else{
        return Promise.reject(new Error('falie'))
     }
    },
    // 用户退出登录
    async userLogout({commit}){
        let result = await reqUserInfo();
        if(result.code==200){
               commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    }
};
const mutations = {
    // 获取验证码
    GETCODEBYPHONE(state,code){
        state.code = code
    },
    // 用户登录
    USERLOGIN(state,token){
        state.token = token
        setToken(token)
    },
    // 获取用户信息
    USERINFO(state,userinfo){
        state.userinfo = userinfo
    },
    // 用户退出登录 
    CLEAR(state){
        state.userinfo = {} ;
        state.token  ='';
        removeToken();
    }
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}