<template>
  <!-- 商品分类导航 三级联动导航栏 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show="show">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: index == selectIndex }"
              >
                <h3 @mouseenter="taggleClass(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: selectIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      selectIndex: -1,
      show: true,
    };
  },
  methods: {
    // 节流(throttle)：限定时间限定次数触发事件
    // 切换背静色
    taggleClass: throttle(function (index) {
      this.selectIndex = index;
    }, 50),
    // 事件委派，移除背景色、隐藏一级导航
    leaveShow() {
      this.selectIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 页面加载为 /search 页面时，鼠标移入显示三级联动一级导航
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 点击跳出到Search路由组件
    goSearch(event) {
      // 解决思路 ：编程式导航 + 事件委派  （给每个添加vrouter-link/回调函数会出现加载资源过多的现象）
      // 首先事件委派给祖先级元素 在通过自定义事件区分所属标签以及所属导航栏级别
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      // 所属标签确认
      if (categoryname) {
        let query = { categoryName: categoryname };
        let location = { name:'search' } 
        // 所属导航栏级别确认
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        } 
        //合并参数 （导航栏以及搜索框数据合并再进行搜索商品）
        if(this.$route.params){
          location.params = this.$route.params
        }
          location.query = query;
          // console.log(location)
          // 路由跳转    
          this.$router.push(location)  
      }
      
    },
  },
  mounted() {
    // 当初次加载页面为 /search 路径时，隐藏三级联动菜单中的一级导航
    if (this.$route.path == "/search") {
      this.show = false;
    }
  },
  computed: {
    // ...mapState({
    //   categoryList: (state) => {
    //     return state.home.categoryList;
    //   },
    // }),
    ...mapState("home", { categoryList: "categoryList" }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过度动画效果
    .sort-enter{
      height: 0px;
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all .5s linear;
    }

  }
}
</style>