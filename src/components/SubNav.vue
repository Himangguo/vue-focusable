<template>
  <div class="sub-nav-wrap" v-if="show">
    <Focus
      v-for="item in subData"
      :key="item.name"
      zIndex="2"
      :onLeave="onLeave"
      :onBeforeLeave="onBeforeLeave"
    >
      <Cube :type="item.type" :name="item.name"/>
    </Focus>
  </div>
</template>

<script>
import { zIndexChange, registerComponent } from "../lib/core";
import Focus from "@/lib/component/Focus.vue";
import Cube from "./Cube.vue";
registerComponent(Cube)
export default {
  name: "SubNav",
  components: {
    Cube,
    Focus,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      subData: [
        { type: "subnav", name: "6" },
        { type: "subnav", name: "7" },
        { type: "subnav", name: "8" },
        { type: "subnav", name: "9" },
        { type: "subnav", name: "10" },
      ],
    };
  },
  methods: {
    onLeave(e) {
      if (e.eventType === "right") {
        this.$emit('showOrHideSubNav');
      }
    },
    onBeforeLeave(e) {
      if (e.eventType === "left" &&
        this.show === true
      ) {
        zIndexChange("down");
      }
    },
  },
};
</script>

<style scoped>
.sub-nav-wrap {
  position: absolute;
  left: 100px;
  top: 60px;
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
</style>
