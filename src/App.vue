<template>
    <div id="app">
      <div class="nav-wrapper">
        <Focus v-for="item in navList" :key="item.name" :onOk="(info)=>handleOk(item.path)" >
          <span class="nav">{{item.name}}</span>
        </Focus>
      </div>
    <router-view/>
  </div>
</template>
<script>
import Focus from "@/lib/component/Focus";
export default {
  name: 'APP',
  components: {
    Focus
  },
  data() {
    return {
      navList: [
        {
          name: 'basic',
          path: '/'
        },
        {
          name: 'zIndex',
          path: '/zIndex'
        },
        {
          name: 'remember',
          path: '/remember'
        },
        {
          name: 'scroll',
          path: '/scroll'
        }
      ]
    }
  },
  methods: {
    handleOk(path) {
      if(path !== this.$route.path) {
        this.$router.push({
          path: path
        })
      }

    }
  }

}

</script>
<style scoped>
.nav-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.nav {
  padding: 10px;
  border: 1px solid black;
  color: black;
}
.nav.focusActive {
  background-color: green;
  color: white;
}

</style>
