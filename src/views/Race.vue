<template>
  <div class="home">
    <h2>Race</h2>
    <div v-if="raceData">
      <v-tabs>
        <v-tab ripple>Results</v-tab>
        <v-tab ripple>Position graph</v-tab>
        <v-tab-item>
          <race-table :raceData="raceData" />
        </v-tab-item>
        <v-tab-item>
          <race-chart :raceData="raceData" :height="700" class="race-chart" />
        </v-tab-item>
      </v-tabs>
    </div>
    <div v-else>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RaceChart from '../components/RaceChart.vue';
import RaceTable from '../components/RaceTable.vue';
import RaceData from '../types/RaceData';
import * as RaceService from '../services/RaceService';

@Component({
  components: { RaceChart, RaceTable },
})
export default class Race extends Vue {
  raceData: RaceData | null = null;

  async mounted() {
    const raceId = this.$route.params.race_id;
    const raceData = await RaceService.getRace(raceId);
    console.log(raceData);
    raceData.results.sort((a, b) => a.position - b.position);
    this.raceData = raceData;
  }

}
</script>

<style scoped>
.theme--dark .race-chart {
  background-color: #1e1e1e;
}
</style>
