import { reqShopCartList ,reqDeleteShopCartById,reqCheckedShopCartById } from "@/api";


const state = {
    cartList: []
}

const actions = {
    // 获取购物车列表
    async getShopCartList({ commit }) {
        let result = await reqShopCartList();
        commit('GETSHOPCARTLIST', result.data)
    },
    // 删除指定商品购物车记录
    async DeleteShopCartById({ commit },skuid){
        let result = await reqDeleteShopCartById(skuid)
        if(result.code==200){
            return "ok"
        }else{
            new Promise(new Error("falie"))
        }
    },
    // 删除全部选定商品购物车记录
    DeleteAllShopCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartInfoList.forEach(item => {
            // promise == Promise
            let promise = item.isChecked == 1 ?dispatch('DeleteShopCartById',item.skuId) :'';
            PromiseAll.push(promise);
        });
        //  Promise.all的效果 >>  every() 
        return Promise.all(PromiseAll)
    },
    // 切换商品选中状态
    async CheckedShopCartById({ commit },{skuId,isChecked}){
        let result = await reqCheckedShopCartById(skuId,isChecked)
        if(result.code==200){
            return "ok"
        }else{
            new Promise(new Error("falie"))
        }
    },
    // 切换所有商品选中状态
    UpdateAllChecked({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.cartInfoList.forEach(item => {
            // promise == Promise
            let promise = item.isChecked != isChecked ?  dispatch('CheckedShopCartById',{skuId:item.skuId,isChecked:isChecked}) :'';
            PromiseAll.push(promise);
        });
        console.log(PromiseAll);
        //  Promise.all的效果 >>  every() 
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETSHOPCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    // 购物车列表具体数据
    cartList(state) {
        return state.cartList[0] || {}
    },
    cartInfoList(state) {
        return state.cartList[0].cartInfoList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}