<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increase">👍+1</button>
    <ul>
      <li v-for="item in numbers" :key="item">
        <h1>{{ item }}</h1>
      </li>
    </ul>
    <Modal :isOpen="isOpen" @close-modal="onModalClose">我的modal</Modal>
    <Suspense>
      <template #default>
        <AsyncShow />
      </template>
      <template #fallback>Loading...</template>
    </Suspense>
    <button @click="openModal">open</button>
    <h1>{{ person.name }}</h1>
    <h1 v-if="loading">loading...</h1>
    <img v-if="loaded" :src="result[0].url" />
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs, watch, ref } from "vue";
import useURLLoader from "./userLoader";
import Modal from "./components/modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogReult {
  stauts: string;
  message: string;
}
interface CatResult {
  width: number;
  height: number;
  id: string;
  url: string;
}
export default {
  name: "App",
  components: {
    Modal,
    AsyncShow,
  },
  setup() {
    const data: DataProps = reactive({
      // 邮箱校验
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {},
    });
    const { result, loading, loaded } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log("result", result.value[0].url);
      }
    });
    const isOpen = ref(false);
    const openModal = () => {
      isOpen.value = true;
    };
    const onModalClose = () => {
      isOpen.value = false;
    };
    data.numbers[0] = 9;
    const toRef = toRefs(data);
    return {
      ...toRef,
      result,
      loading,
      loaded,
      isOpen,
      openModal,
      onModalClose,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
