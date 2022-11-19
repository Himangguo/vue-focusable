<template>
  <div class="scroll">
    <FocusScroll class="scroll-nav-wrap" data-dir="v">
      <div class="scroll-nav-v">
        <Focus v-for="item in list" :key="item.name" :on-active="()=>handleActive(item)">
          <Cube :name="item.name" />
        </Focus>
      </div>
    </FocusScroll>
    <FocusScroll  class="scroll-content-wrap" data-dir="v">
      <div class="scroll-content-v">
        <div v-if="!cur">please select one menu</div>
        <Focus v-else v-for="item in 20" :key="item">
          <Cube :name="cur+'-'+item" />
        </Focus>
      </div>
    </FocusScroll>


  </div>
</template>

<script>
import {registerComponent} from "@/lib/core";
import Focus from "@/lib/component/Focus";
import FocusScroll from "@/lib/component/FocusScroll";
import Cube from "@/components/Cube";
registerComponent(Cube)
export default {
  name: "scroll",
  components: {
    Focus,
    FocusScroll,
    Cube
  },
  data() {
    return {
      list: [
        {type: 'lists', name: '1'},
        {type: 'lists', name: '2'},
        {type: 'lists', name: '3'},
        {type: 'lists', name: '4'},
        {type: 'lists', name: '5'},
        {type: 'lists', name: '6'},
        {type: 'lists', name: '7'},
        {type: 'lists', name: '8'},
        {type: 'lists', name: '9'},
        {type: 'lists', name: '10'},
        {type: 'lists', name: '11'},
        {type: 'lists', name: '12'},
        {type: 'lists', name: '13'},
        {type: 'lists', name: '14'}
      ],
      cur: ''
    }
  },
  methods: {
    handleActive(item) {
      this.cur = item.name
    }
  }
}
</script>

<style scoped>
.scroll {
  padding: 20px;
  display: flex;
  width: 800px;
}
.scroll-nav-wrap {
  margin-right: 20px;
}
.scroll-content-wrap {
  background-color: sandybrown;

}
.scroll-nav-v {
  height: 300px;
}
.scroll-content-v {
  height: 300px;
  width: 360px;
  display: flex;
  flex-wrap: wrap;
}
.cube {
  width: 100px;
  height: 40px;
  background: #cccccc;
  font-size: 23px;
  text-align: center;
  line-height: 40px;
  margin: 10px;
}

.cube.focusActive {
  /*border: 1px solid red;*/
  box-shadow: 0 0 2px 3px red;
  transform: scale(1.1);
}
.test {
  color: red;
}

</style>
