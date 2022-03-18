import { reqCategoryList , reqGetBannnerList, reqGetFloorList} from "@/api";
// state: 仓库存储数据
const state = { 
    // 存储三级菜单数据
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    // floor数据
    floorList:[],
};
// actions : 业务逻辑加工
const actions = {
    // 给服务器发送请求
    async categoryList({commit}){
        let result = await reqCategoryList();
        // 数据获取成功传递数据
        if(result.code == 200){
         commit("CATEGORYLIST",result.data)
        }
    },
    // 获取轮播图数据
    async getBannerList({commit}){
        let result = await reqGetBannnerList();
        if(result.code == 200){
        commit("GETBANNERLIST",result.data)
        }
    },
    // 获取Floor数据
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        // console.log(result);
        if(result.code == 200){
        commit("GETFLOORLIST",result.data)
        }
    },
};
// mutations: 加工厂
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.splice(0, 16);
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    },
};
// getters : 简化版计算属性
const getters = {};


export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
};
