<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="boxx">
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

<style>
* {
  margin: 0;
  padding: 0;
}

.boxx {
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

.lists {
  width: 100px;
  height: 100px;
  background: blue;
  float: left;
  margin-right: 20px;
}

.subnav {
  margin-bottom: 0;
  background: red;
}

.nav-wrap {
  float: left;
  width: 100px;
  margin: 20px 20px 0 0;
  position: relative;
}

.sub-nav-wrap {
  position: absolute;
  top: 0;
  left: 100px;
}

.videolist-wrap {
  float: left;
  width: 450px;
  margin-top: 20px;
}

.cube.focusActive {
  background: green;
}
/*.cube.cached {*/
/*  background: yellow;*/
/*}*/
</style>
