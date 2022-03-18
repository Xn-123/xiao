
import { reqGetSearchInfo } from '@/api'
// state: 仓库存储数据
const state = {
    searchList: {}
};
// actions : 业务逻辑加工
const actions = {
    async getSearchInfo({ commit }, parames = {}) {
        let result = await reqGetSearchInfo(parames);
        // console.log(result)
        if (result.code == 200) {
            commit('GETSEARCHINFO', result.data)
        }
    }
};
// mutations: 加工厂
const mutations = {
    GETSEARCHINFO(state,searchList){
        state.searchList =  searchList
    }
};
// getters : 简化版计算属性
const getters = {
    goodsList(state){
        return  state.searchList.goodsList
    },
    attrsList(state){
        return  state.searchList.attrsList
    },
    trademarkList(state){
        return  state.searchList.trademarkList
    },
};


export default {
    state,
    actions,
    mutations,
    getters
};
