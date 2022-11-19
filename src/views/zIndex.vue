<template>
  <div class="zIndex">
    <div class="box">
      <div class="nav-wrap">
        <Focus
          v-for="item in navData"
          :key="item.name"
          :onOk="showOrHideSubNav"
          :onBeforeLeave="onBeforeLeave"
        >
          <div class="cube">{{ item.name }}</div>
        </Focus>
      </div>
      <SubNav :show="show" @showOrHideSubNav="showOrHideSubNav" />
    </div>
    <div class="app-wrapper">
      <Focus v-for="item in appList" :key="item.name">
        <div class="app">{{item.name}}</div>
      </Focus>
    </div>
  </div>
</template>
<script>
import Focus from "@/lib/component/Focus.vue";
import SubNav from "../components/SubNav.vue";
import { zIndexChange } from "../lib/core";
export default {
  name: "About",
  components: {
    Focus,
    SubNav,
  },
  data() {
    return {
      show: false,
      navData: [
        { type: "nav", name: "1" },
        { type: "nav", name: "2" },
        { type: "nav", name: "3" },
        { type: "nav", name: "4" },
        { type: "nav", name: "5" },
      ],
      appList: [
        {
          name: 'youtube'
        },
        {
          name: 'netfix'
        },
        {
          name: 'ddd'
        },
        {
          name: 'lkk'
        },
        {
          name: 'ghfj'
        },
        {
          name: 'hj'
        },
      ]
    };
  },
  methods: {
    onBeforeLeave(e) {
      if (e.eventType === "right" && this.show === true) {
        zIndexChange("up");
      }
    },
    showOrHideSubNav() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.zIndex {
  display: flex;
}
.app-wrapper {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
}
.app {
  width: 33%;
  background-color: blue;
  color: white;
  text-align: center;
  margin: 5px;
}
.app.focusActive {
  background-color: green;
}
.box {
  display: flex;
}
.cube {
  width: 100px;
  height: 30px;
  background: red;
  font-size: 23px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 10px;
}
.cube.focusActive {
  background: green;
}

.nav-wrap {
  float: left;
  width: 100px;
  margin: 20px 20px 0 0;
  position: relative;
}



</style>
