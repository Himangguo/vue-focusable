<template>
  <div :class="['cube', focusStateClass, type]">{{ name }}</div>
</template>

<script>
export default {
  nmae: "Cube",
  props: {
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    focusStateClass: {
      type: String,
      default: "",
    },
  },
  updated() {
    console.log('update',this.focusStateClass);
  }
};
</script>
