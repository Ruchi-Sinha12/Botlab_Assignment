<!-- src/components/DroneTelemetry.vue -->
<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Drone Telemetry</div>
    </q-card-section>

    <q-card-section>
      <q-table
        :rows="[drone]"
        :columns="columns"
        flat
        dense
        row-key="id"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        color="red"
        label="Toggle Failure"
        @click="toggleFailure"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import droneSimulator from "../simulation/DroneSimulator";

export default {
  name: "DroneTelemetry",
  setup() {
    const drone = ref({ ...droneSimulator.drone });

    const update = (data) => {
      drone.value = { ...data };
    };

    const intervalId = ref(null);

    onMounted(() => {
      droneSimulator.attach({ update });
      intervalId.value = setInterval(() => {
        droneSimulator.updateDrone();
      }, 500);
    });

    onBeforeUnmount(() => {
      clearInterval(intervalId.value);
    });

    const toggleFailure = () => {
      droneSimulator.toggleFailure();
    };

    const columns = [
      { name: "id", label: "Drone ID", field: "id" },
      { name: "latitude", label: "Latitude", field: "latitude", format: (val) => val.toFixed(6) },
      { name: "longitude", label: "Longitude", field: "longitude", format: (val) => val.toFixed(6) },
      { name: "altitude", label: "Altitude (m)", field: "altitude", format: (val) => val.toFixed(1) },
      { name: "heading", label: "Heading (°)", field: "heading", format: (val) => val.toFixed(1) },
      { name: "speed", label: "Speed (m/s)", field: "speed", format: (val) => val.toFixed(1) },
      { name: "battery", label: "Battery (%)", field: "battery", format: (val) => val.toFixed(1) },
      { name: "gpsFix", label: "GPS Fix", field: "gpsFix" },
    ];

    return { drone, toggleFailure, columns };
  },
};
</script>
