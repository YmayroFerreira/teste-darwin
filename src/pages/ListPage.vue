<template>
  <q-page class="row items-center justify-evenly">
    <div class="row justify-center">
      <div class="col-12">
        <h1>The Rick and Morty</h1>
      </div>
      <q-input
        outlined
        bottom-slots
        v-model="text"
        label="Pesquisar"
        maxlength="40"
        dense
        class="col-12"
      >
        <template v-slot:after>
          <q-select
            v-model="status"
            :options="options"
            value="value"
            label="Situação"
            style="width: 300px"
          />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="text !== ''"
            name="close"
            @click="resetChars"
            class="cursor-pointer"
          />
          <q-icon name="search" @click="searchChars" class="cursor-pointer" />
        </template>
      </q-input>
      <LoadingComponent />
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
import LoadingComponent from 'components/LoadingComponent.vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Character, BasicOption } from 'components/models';

export default defineComponent({
  name: 'ListPage',
  components: { CardComponent, LoadingComponent },
  setup() {
    const CharacterList = ref<Character[]>([]);
    const text = ref('');
    const status = ref<BasicOption | null>(null);
    const options = ref<BasicOption[]>([
      {
        label: 'Nenhum',
        value: 'none',
      },
      {
        label: 'Vivo',
        value: 'Alive',
      },
      {
        label: 'Morto',
        value: 'Dead',
      },
      {
        label: 'Desconhecido',
        value: 'Unknown',
      },
    ]);
    const getRandomChars = () => {
      const randomIds: number[] = Array(12) // Documentação mostra que há até 826 personagens
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
    const searchChars = () => {
      let statusQuery = '';
      switch (status.value?.value) {
        case 'Alive': {
          statusQuery = '&status=alive';
          break;
        }
        case 'Dead': {
          statusQuery = '&status=dead';
          break;
        }
        case 'Unknown': {
          statusQuery = '&status=unknown';
          break;
        }
        default: {
          statusQuery = '';
          break;
        }
      }
      axios(
        'https://rickandmortyapi.com/api/character/?name=' +
          text.value +
          statusQuery
      )
        .then(function (response) {
          CharacterList.value = response.data.results;
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          console.log(CharacterList.value);
        });
    };
    const resetChars = () => {
      text.value = '';
      getRandomChars();
    };
    return {
      text,
      status,
      CharacterList,
      options,
      getRandomChars,
      searchChars,
      resetChars,
    };
  },
  mounted() {
    this.getRandomChars();
  },
});
</script>
