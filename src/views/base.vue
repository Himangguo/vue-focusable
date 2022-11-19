<template>
  <div class="base">
    <div class="nav-wrap">
      <Focus
          v-for="item in navData"
          :key="item.name"
          :onOk="(info)=>handleOk(info, item)"
      >
        <div class="cube">{{ item.name }}</div>
      </Focus>
    </div>
  </div>
</template>

<script>
import Focus from "@/lib/component/Focus";
export default {
  name: 'HomeView',
  components: {
    Focus
  },
  data() {
    return {
      navData: [
        { type: "nav", name: "1" },
        { type: "nav", name: "2" },
        { type: "nav", name: "3" },
        { type: "nav", name: "4" },
        { type: "nav", name: "5" },
      ],
    }
  },
  methods: {
    handleOk(info, item) {
      console.log(info,item)
    }
  }
}
</script>

<style scoped>
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
