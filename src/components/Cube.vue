<template>
  <div :class="['cube', focusStateClass, type]">{{ name }}</div>
</template>

<script>
export default {
  name: "Cube",
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
  methods: {
  }
};
</script>
