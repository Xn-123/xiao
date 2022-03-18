// 配置路由

//引入 Vue VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'

//应用VueRouter
Vue.use(VueRouter)

// 重写 VueRouter原型中的push、replace
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, localtion, resolve, reject)
    } else {
        originPush.call(this, localtion, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, localtion, resolve, reject)
    } else {
        originReplace.call(this, localtion, () => { }, () => { })
    }
}


//配置匹配路由跳转 let router = 
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫 ：前置守卫 （在路由跳转之间执行）
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userinfo.name;
    // 用户登录了
    if (token) {
        // 用户跳转再次跳转登录（不放心）
        if (to.path == '/login') {
            next('/home')
        } else {
            //  跳转另外的路由&&有用户信息
            if (name) {
                next(); 
            } else {
                // 没有
                try {
                    // // 初始化加载用户信息
                    await store.dispatch('userInfo')
                    next();
                } catch (error) {
                    // token失效
                    await store.dispatch('userLogout')
                    next('/login');
                }
            }
            next();
        }
    } else {
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next();
        }
    }
    next();

})


export default router