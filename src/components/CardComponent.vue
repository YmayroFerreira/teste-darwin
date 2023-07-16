<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ props.character?.name }}
        </div>
        <div class="text-overline">Status: {{ props.character?.status }}</div>
        <div class="text-caption text-grey">
          Local: {{ props.character?.location.name }}
        </div>
      </q-card-section>
      <q-card-section class="col-5 flex flex-center">
        <q-img class="rounded-borders" v-bind:src="props.character?.image" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Character } from './models';

export default defineComponent({
  name: 'CardComponent',
  props: {
    character: Object as PropType<Character>,
  },
  setup(props) {
    return {
      props,
      lorem: 'Lorem ipsum dolor sit amet, blah blah blah',
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 350px
</style>
