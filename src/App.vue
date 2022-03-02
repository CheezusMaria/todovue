<template>
  <div id="app">
    <inputPart />
    <!-- <todoPart /> -->
  </div>
</template>

<script>
import inputPart from "./components/inputPart.vue";
// import todoPart from "./components/todoPart.vue";
import { eventBus } from "./event";

export default {
  name: "App",
  components: {
    inputPart,
    // todoPart,
  },

  mounted() {
    eventBus.$emit("deneme", {
      name: "DENEME ",
      description: "learn About python flask",
      deadline: "2022-02-02",
      status: "in progress",
      isChecked: false,
    });
  },
};
</script>

<style>
</style>
