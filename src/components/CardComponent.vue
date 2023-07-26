<template>
  <q-card class="my-card" flat bordered data-cy="character-card">
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs" data-cy="character-name">
          {{ props.character?.name }}
        </div>
        <div class="text-overline" data-cy="character-status">
          <q-chip
            dense
            size="sm"
            v-bind:color="charStatus(props.character?.status).color"
            data-cy="character-status-chip"
          >
            &nbsp;
          </q-chip>
          Status: {{ charStatus(props.character?.status).label }}
        </div>
        <div class="text-caption text-white" data-cy="character-status-place">
          Local: {{ props.character?.location.name }}
        </div>
      </q-card-section>
      <q-card-section
        class="col-5 flex flex-center"
        data-cy="character-status-img"
      >
        <q-img class="rounded-borders" v-bind:src="props.character?.image" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Character, Status } from './models';

export default defineComponent({
  name: 'CardComponent',
  props: {
    character: Object as PropType<Character>,
  },
  setup(props) {
    const charStatus = (status: string | undefined) => {
      let currentStatus: Status = { color: 'grey', label: 'Desconhecido' };
      switch (status) {
        case 'Alive': {
          currentStatus = { color: 'green', label: 'Vivo' };
          break;
        }
        case 'Dead': {
          currentStatus = { color: 'red', label: 'Morto' };
          break;
        }
        default: {
          currentStatus = { color: 'grey', label: 'Desconhecido' };
          break;
        }
      }
      return currentStatus;
    };
    return {
      charStatus,
      props,
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 350px
  background-color: #A7CB54
</style>
