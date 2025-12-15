<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Drone Telemetry Simulator</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md">
      <DroneTelemetry />
    </q-page-container>
  </q-layout>
</template>

<script>
import DroneTelemetry from "./components/DroneTelemetry.vue";

export default {
  name: "App",
  components: { DroneTelemetry },
};
</script>
