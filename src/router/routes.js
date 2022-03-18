//引入 路由

import SearchRoute from '@/pages/Search'
import AddCartSuccess from '@/pages/AddCartSuccess'


export default [
    {
        path: '/center',
        name: 'center',
        component: ()=>import('@/pages/Center'),
        meta: { isShow: true },
        children:[
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder')
            },
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder')
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        name: 'paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { isShow: true },
        //路由独享
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车过来
            if(from.path =='/pay'){
                next()
            }else{
                // 其他停留在当前
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: ()=>import('@/pages/Pay'),
        meta: { isShow: true },
        //路由独享
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车过来
            if(from.path =='/trade'){
                next()
            }else{
                // 其他停留在当前
                next(false)
            }
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: ()=>import('@/pages/Trade'),
        meta: { isShow: true },
        //路由独享
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车过来
            if(from.path =='/shopcart'){
                next()
            }else{
                // 其他停留在当前
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { isShow: true },     
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { isShow: true },
    },
    {
        path: '/detail/:skuid?',
        component:()=>import('@/pages/Detail'),
        meta: { isShow: true },
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { isShow: true },
        name: 'home'
    },
    {
        path: '/search/:keyCord?',
        component: ()=>import('@/pages/Search'),
        meta: { isShow: true },
        name: 'search',
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { isShow: false },
        name: 'login'
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { isShow: false },
        name: 'register'
    },
    // 配置浏览器打开默认路由、重定向路由
    {
        path: '*',
        redirect: '/home'
    },
]
