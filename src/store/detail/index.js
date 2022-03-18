import { reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
// 封装游客身份模块uuid ---- > 生成一个随机字符串
import {getUUID} from "@/utils/uuid_token"

const state = {
    goodsInfoList:{},
    uuid_token: getUUID()
}
const actions = {
    // 
      async goodsInfoList({commit},skuId){
          const result = await reqGoodsInfo(skuId)
          if( result.code == 200){
            commit('GOODSINFOLIST',result.data)
          }
      },
    //   
      async addOrUpdateShopCart({commit},{skuId,skuNum}){
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if( result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
}
const mutations = {
    GOODSINFOLIST(state,goodsInfoList){
        state.goodsInfoList = goodsInfoList
    }
}
const getters = {
    categoryView(state){
        // {} 处理数据未返回前控制台的报错 
        return state.goodsInfoList.categoryView || {}
    },
    skuInfo(state){
         // {} 处理数据未返回前控制台的报错 
         return state.goodsInfoList.skuInfo || {}
    },
    spuSaleAttrList(state){
        // {} 处理数据未返回前控制台的报错 
        return state.goodsInfoList.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}