<template>
  <q-page class="row items-center justify-evenly">
    <div class="row justify-center">
      <div class="col-12">
        <h1>The Rick and Morty</h1>
      </div>
      <CardComponent
        v-for="(character, index) in CharacterList"
        v-bind:key="index"
        v-bind:character="character"
        class="col-4"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import CardComponent from 'components/CardComponent.vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Character } from 'components/models';

export default defineComponent({
  name: 'ListPage',
  components: { CardComponent },
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
      CharacterList,
      apicall,
    };
  },
  mounted() {
    this.apicall(); // 0
  },
});
</script>
