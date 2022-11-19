<template>
  <div class="rem-wrapper">
    <div class="nav-wrapper">
      <Focus
          v-for="(item, index) in navData"
          :key="item.name"
          :fo-index="index+1"
          :onOk="(info)=>handleOk(info, index)"
      >
        <div class="cube" @click="test123">{{ item.name }}</div>
      </Focus>
    </div>
    <div class="content-wrapper">
      {{navData[curNavIndex]?`This is ${navData[curNavIndex].name} content`: 'please select one menu'}}
      <Focus v-if="curNavIndex!==null" :fo-goto="foGoto">
        text focus
      </Focus>
    </div>
  </div>
</template>

<script>
import Focus from "@/lib/component/Focus";
export default {
  name: "Remember",
  components: {
    Focus,
  },
  computed: {
    foGoto() {
      return `0;0;0;${this.curNavIndex+1}`
    }
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
      curNavIndex: null
    }
  },
  methods: {
    handleOk(info, index) {
      this.curNavIndex = index
    },
    test123() {
      console.log('dddd')
    }
  }
}
</script>

<style scoped>
.rem-wrapper {
  display: flex;
}
.nav-wrapper {
  margin-right: 20px;
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
.content-wrapper .focusActive {
  background-color: green;
  color: white;
  padding: 5px;
}
</style>
