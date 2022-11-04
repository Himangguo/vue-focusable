<template>
  <FocusManageVue>
    <div id="app" :class="dd" class="12">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
  </FocusManageVue>
</template>
<script>
import FocusManageVue from './lib/component/FocusManage.vue';
export default {
  name: 'APP',
  components: {
    FocusManageVue
  },
  data() {
    return {
      dd: 3234
    }
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
