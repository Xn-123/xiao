import Vue from 'vue'
import App from './App.vue'

// 引入路由组件管理器
import router from '@/router'
// 引入三级联动导航栏
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 按需引入图形插件
import { Button,MessageBox} from 'element-ui';

Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入仓库
import store from '@/store'
// 引入mockServe.js
import '@/mock/mockServe';
// 引包
import 'swiper/css/swiper.css'
// 引入接口
import * as API from '@/api'

//引入默认图片
import a from '@/assets/logo.png'


// 引入插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: a,
})

// 引入校验插件
import '@/plugins/validate'

// import {reqGetSearchInfo} from '@/api'
// reqGetSearchInfo({})

//注册全局组件  三级联动导航栏
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由管理器
  router,
  store
}).$mount('#app')
