// 当前模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax';
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList =  ()=> requests({method:'get',url:'/product/getBaseCategoryList'});

// 轮播图 mock虚拟请求数据接口
export const reqGetBannnerList =  ()=> mockRequests.get('/banner');
// floor mock虚拟请求数据接口
export const reqGetFloorList =  ()=> mockRequests.get('/floor');

// 获取匹配查询的商品数据接口
export const reqGetSearchInfo =  (parames)=> requests({url:'/list',method:'post',data:parames});

// 获取单个商品的详情数据接口 /api/item/{ skuId }   get
export const reqGoodsInfo =  (skuId)=> requests({url:`/item/${skuId}`,method:'get'});

// 添加至购物车接口 /api/cart/addToCart/{ skuId }/{ skuNum }   POST
export const reqAddOrUpdateShopCart =  (skuId,skuNum)=> requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

// 获取购物车列表接口  /api/cart/cartList  get
export const reqShopCartList =  (skuId,skuNum)=> requests({url:'/cart/cartList',method:'get'});

// 删除指定商品购物车记录接口 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteShopCartById =  (skuId)=> requests({url:`cart/deleteCart/${skuId}`,method:'delete'});

// 切换商品选中状态接口  /api/cart/checkCart/{skuID}/{isChecked}  GET
export const reqCheckedShopCartById =  (skuId,isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码接口  /api/user/passport/sendCode/{phone}  GET
export const reqGetCodeByPhone =  (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册用户 /api/user/passport/register POST
export const reqUserRegister =  (data)=> requests({url:`/user/passport/register`,data,method:'post'});

// 用户登录 /api/user/passport/login POST
export const reqUserLogin =  (data)=> requests({url:`/user/passport/login`,data,method:'post'});

// 获取用户信息 【携带token】 /api/user/passport/auth/getUserInfo  get
export const reqUserInfo =  ()=> requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

// 退出登录  /api/user/passport/logout get
export const reqLogout =  ()=> requests({url:`/user/passport/logout`,method:'get'});

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList get
export const reqUserAddressList = ()=> requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'});

// 获取订单交易页信息 /api/order/auth/trade  get
export const reqOrderInfo = ()=> requests({url:`/order/auth/trade`,method:'get'});

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder=  (tradeNo,data)=> requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取订单支付信息  /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId)=> requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = (orderId)=> requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取我的订单列表 /api/order/auth/{page}/{limit}  GET
export const reqMyOrderInfo = (page,limit)=> requests({url:`/order/auth/${page}/${limit}`,method:'get'});

