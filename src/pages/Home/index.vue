<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <GoodsRank />
    <UserLike />
    <GoodsFloor v-for="floor in floorList"  :key="floor.id" :list="floor"/>
    <GoodsBrand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import GoodsRank from "./GoodsRank";
import UserLike from "./UserLike";
import GoodsFloor from "./GoodsFloor";
import GoodsBrand from "./GoodsBrand";

import { mapState } from "vuex";
import Swiper from 'swiper'

export default {
  name: "HomeRoute",
  components: {
    ListContainer,
    TodayRecommend,
    GoodsRank,
    UserLike,
    GoodsFloor,
    GoodsBrand,
  },
  computed: {
    // 读取floor数据
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
  mounted() {
    // 初始化加载Floor数据
    this.$store.dispatch("home/getFloorList");
    // this.$store.dispatch('userInfo')
  },
};
</script>

<style lang="less" scoped>
</style>
