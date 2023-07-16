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
    />
    <q-pagination
      :model-value="props.current"
      :current="props.current"
      @update:model-value="(value) => $emit('change', value)"
      :max="props.max"
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
    />
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
