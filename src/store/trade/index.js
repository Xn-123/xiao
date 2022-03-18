import { reqUserAddressList ,reqOrderInfo} from "@/api";

const state = {
    address:[],
    orderinfo:{}
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqUserAddressList();
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    // 获取订单交易页信息
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if(result.code==200){
            commit('GETORDERINFO',result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state,address){
        state.address =  address
    },
    GETORDERINFO(state,orderinfo){
        state.orderinfo =  orderinfo
    },
}
const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}   