<template>
  <q-page class="row items-center justify-evenly">
    <div class="row justify-center">
      <q-input
        outlined
        bottom-slots
        v-model="text"
        label="Pesquisar"
        maxlength="40"
        dense
        class="col-12 q-ma-lg"
        color="green"
        data-cy="search-input"
      >
        <template v-slot:after>
          <q-select
            v-model="status"
            :options="options"
            value="value"
            label="Situação"
            style="width: 300px"
            color="green"
            data-cy="search-select"
          />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="text !== ''"
            name="close"
            @click="resetChars"
            class="cursor-pointer"
            color="green"
            data-cy="search-clean"
          />
          <q-icon
            name="search"
            @click="
              () => {
                currentSearch = text;
                searchChars(1);
              }
            "
            class="cursor-pointer"
            color="green"
            data-cy="search-start"
          />
        </template>
      </q-input>
      <div class="col-12 align-center" v-if="showPages">
        <PaginationComponent
          v-model:current="currentPage"
          :max="maxPage"
          @first="searchChars(1)"
          @last="searchChars(maxPage)"
          @change="searchChars"
        />
      </div>
      <LoadingComponent v-if="loading" class="col-12" />
      <CardComponent
        v-else
        v-for="(character, index) in CharacterList"
        v-bind:key="index"
        v-bind:character="character"
        class="col-4"
      />
      <div class="col-12 align-center" v-if="showPages">
        <PaginationComponent
          v-model:current="currentPage"
          :max="maxPage"
          @first="searchChars(1)"
          @last="searchChars(maxPage)"
          @change="searchChars"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import CardComponent from 'components/CardComponent.vue';
import LoadingComponent from 'components/LoadingComponent.vue';
import PaginationComponent from 'components/PaginationComponent.vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { Character, BasicOption } from 'components/models';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ListPage',
  components: { CardComponent, LoadingComponent, PaginationComponent },
  setup() {
    const $q = useQuasar();
    const CharacterList = ref<Character[]>([]);
    const text = ref('');
    const currentSearch = ref('');
    const loading = ref(false);
    const currentPage = ref(1);
    const maxPage = ref(1);
    const showPages = ref(false);
    const status = ref<BasicOption | null>(null);
    const options = ref<BasicOption[]>([
      {
        label: '',
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
      loading.value = true;
      showPages.value = false;
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
          loading.value = false;
        });
    };
    const searchChars = (page: number) => {
      loading.value = true;
      showPages.value = true;
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
          currentSearch.value +
          statusQuery +
          '&page=' +
          page
      )
        .then(function (response) {
          CharacterList.value = response.data.results;
          currentPage.value = page;
          maxPage.value = response.data.info.pages;
          showPages.value = true;
        })
        .catch(function (error) {
          $q.notify({
            message: 'Buuuurp, al---algo deu errado Morty!!!!!!',
            caption: error.response.status,
            color: 'negative',
          });
        })
        .finally(function () {
          loading.value = false;
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
      loading,
      currentPage,
      showPages,
      maxPage,
      currentSearch,
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
