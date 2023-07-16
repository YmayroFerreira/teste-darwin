<template>
  <div class="q-pa-md flex flex-center">
    <q-circular-progress
      show-value
      indeterminate
      size="190px"
      :thickness="0.2"
      color="lime"
      center-color="grey-8"
      track-color="transparent"
      class="q-ma-md"
    >
      <q-img style="height: 180px" :src="getLoadImage()" />
    </q-circular-progress>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingComponent',
  setup() {
    const images = [
      '/rick.png',
      '/Rick-And-Morty-PNG-Image.png',
      '/Rick-And-Morty-PNG.png',
    ];
    const getLoadImage = () => {
      let imgIndex = Math.floor(3 * Math.random());
      return images[imgIndex];
    };
    return {
      images,
      getLoadImage,
    };
  },
});
</script>
