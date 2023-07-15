<template>
  <q-page class="row items-center justify-evenly">
    <h1>The Rick and Morty</h1>
  </q-page>
</template>

<script lang="ts">
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Character } from 'components/models';
export default defineComponent({
  name: 'ListPage',
  components: {},
  setup() {
    const CharacterList = ref<Character[]>([]);

    const apicall = () => {
      const randomIds: number[] = Array(10) // Documentação mostra que há até 826 personagens
        .fill(undefined)
        .map(() => Math.floor(826 * Math.random()));
      axios('https://rickandmortyapi.com/api/character/' + randomIds.toString())
        .then(function (response) {
          CharacterList.value = response.data;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          console.log(CharacterList.value);
        });
    };
    return {
      apicall,
    };
  },
  mounted() {
    this.apicall(); // 0
  },
});
</script>
