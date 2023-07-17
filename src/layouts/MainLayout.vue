<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header" style="height: 130px">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            style="height: 100px; width: 250px; padding-bottom: 50px"
            src="Rick-And-Morty-PNG-File.png"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    return {};
  },
});
</script>
<style lang="sass" scoped>
header
  background-color: #208d45
main
  background-color: #F0F2EB
</style>
