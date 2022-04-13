<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>this is model</slot></h2>
      <button @click="buttonClick">close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DiaLog",
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return {
      buttonClick,
    };
  },
});
</script>
<style>
#center {
  height: 200px;
  width: 200px;
  margin: auto;
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid black;
}
</style>