<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for=" cart  in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="updateChecked(cart,$event)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{cart.skuName}}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="hander('min',-1,cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="hander('change',$event.target.value*1,cart)"
            />
            <a href="javascript:void(0)" class="plus"  @click="hander('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.cartPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShopCartById(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updateAllChecked($event)"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllShopCart">删除选中的商品</a>
        <a >移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{cartInfoList.length}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  methods: {
    getData(){
      // 获取个人购物车数据
      this.$store.dispatch('getShopCartList')
    },
    // 修改某一个产品的数量 (节流)
    hander:throttle(async function(type,disNum,cart){
        // type: 指定操作类型
        // disNum: 指定变化量 input再加工计算
        // cart: 指定操作具体某个产品
        switch(type){
          case "add": disNum = 1 ;break;
          case "min": disNum = cart.skuNum > 1 ? -1 : 0 ;break;
          case "change" :
            disNum = ( isNaN(disNum)||disNum<1 ) ? 0 : (parseInt(disNum) - cart.skuNum)
            break;
        }
        try {
        // 修改成功
        await  this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
        // 重新展示最新的数据
          this.getData();
        } catch (error) {
         alert(error.message)
        }
    },500),

    // 删除指定商品购买记录
    async deleteShopCartById(skuId){
      try {
          // 删除成功
         await this.$store.dispatch('DeleteShopCartById',skuId)
          // 重新展示最新的数据
          this.getData();
      } catch (error) {
         alert(error.message)
      }
    },

    // 切换商品选中状态
    async updateChecked(cart,event){
      // 商品选中状态 0代表取消选中 1代表选中(接口要求number) 
      let isChecked = event.target.checked? 1: 0
      try {
          // 切换成功
         await this.$store.dispatch('CheckedShopCartById',{skuId:cart.skuId,isChecked:isChecked})
          // 重新展示最新的数据
          this.getData();
      } catch (error) {
         alert(error.message)
      }
    },

    // 切换全部商品选中状态
    async updateAllChecked(event){
      let isChecked = event.target.checked? 1: 0
      try {                       
          // 切换所有成功
         await this.$store.dispatch('UpdateAllChecked',isChecked)
          // 重新展示最新的数据
          this.getData();
      } catch (error) {
         alert(error.message)
      }   
    },

    // 删除所有checked商品购买记录
    async deleteAllShopCart(){
        try {                       
          // 删除所有成功
         await this.$store.dispatch('DeleteAllShopCart')
          // 重新展示最新的数据
          this.getData();
      } catch (error) {
         alert(error.message)
      }
    }
  },
  computed:{
    // 产品信息
    ...mapGetters(['cartList']),
    cartInfoList(){
      return this.cartList.cartInfoList || []
    },
    // 计算购买产品的总价
    totalPrice(){
      let totalPrice = 0
      this.cartInfoList.forEach( cart => {
        totalPrice += cart.cartPrice * cart.skuNum
      });
      return totalPrice
    },
    // 
    isAllChecked(){
      return this.cartInfoList.every( cart => cart.isChecked == 1 );
    }
  },
  mounted() {
    this.getData()
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>