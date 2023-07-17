<template>
  <div class="row justify-center">
    <q-img
      style="
         {
          height: 100px;
          width: 100px;
          cursor: pointer;
        }
      "
      src="/rick-left.png"
      class="col-3"
      @click="$emit('first')"
    >
      <q-tooltip
        anchor="center left"
        self="center left"
        :offset="[10, 10]"
        class="bg-green"
      >
        <strong>Primeira</strong>
      </q-tooltip>
    </q-img>
    <q-pagination
      :model-value="props.current"
      :current="props.current"
      @update:model-value="(value) => $emit('change', value)"
      :max="props.max"
      :max-pages="10"
      push
      color="teal"
      active-design="push"
      active-color="orange"
      class="col-auto"
    />
    <q-img
      style="
         {
          height: 100px;
          width: 100px;
          cursor: pointer;
        }
      "
      src="/morty-right.png"
      class="col-3"
      @click="$emit('last')"
    >
      <q-tooltip
        anchor="center right"
        self="center right"
        :offset="[10, 10]"
        class="bg-green"
      >
        <strong>Ultima</strong>
      </q-tooltip>
    </q-img>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaginationComponent',
  props: {
    current: Number,
    max: Number,
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
