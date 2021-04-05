<template>
  <div class="home">
    <h2>Race</h2>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Position</th>
          <th class="text-left">Name</th>
          <th class="text-left">Start position</th>
          <th class="text-left">Positions gained</th>
          <th class="text-left">Time</th>
          <th class="text-left">Points</th>
        </tr>
      </thead>
      <tbody v-if="raceData">
        <tr v-for="result in raceData.results" :key="result.id">
          <td>{{ result.position }}</td>
          <td>{{ result.driverName }}</td>
          <td>{{ result.startPosition + 1 }}</td>
          <td>{{ result.startPosition + 1 - result.position }}</td>
          <td>{{ `+${diffToWinner(result)}s` }}</td>
          <td>{{ result.points }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RaceData from '../types/RaceData';
import * as RaceService from '../services/RaceService';

@Component
export default class Race extends Vue {
  raceData: RaceData | null = null;

  async mounted() {
    const raceId = this.$route.params.race_id;
    const raceData = await RaceService.getRace(raceId);
    console.log(raceData);
    raceData.results.sort((a, b) => a.position - b.position);
    this.raceData = raceData;
  }

  totalTime(result: RaceData['results'][0]) {
    return result.laps.reduce((prev, curr) => prev + curr.laptime, 0);
  }

  diffToWinner(result: RaceData['results'][0]) {
    const winnerTotalTime = this.totalTime(this.raceData.results[0]);
    const currentTotalTime = this.totalTime(result);
    const diff = currentTotalTime - winnerTotalTime;
    return diff.toFixed(3);
  }
}
</script>
