<template>
  <v-simple-table>
    <thead>
      <tr>
        <th class="text-left">Position</th>
        <th class="text-left">Name</th>
        <th class="text-left">Team</th>
        <th class="text-left">Start position</th>
        <th class="text-left">Positions gained</th>
        <th class="text-left">Time</th>
        <th class="text-left">Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in this.raceData.results" :key="result.id">
        <td>{{ result.position }}</td>
        <td>{{ result.driverName }}</td>
        <td>{{ result.teamName }}</td>
        <td>{{ result.startPosition }}</td>
        <td>{{ result.startPosition - result.position }}</td>
        <td>{{ `+${diffToWinner(result)}s` }}</td>
        <td>{{ result.points }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RaceData from '../types/RaceData';

@Component
export default class RaceTable extends Vue {
  @Prop(Object)
  raceData: RaceData;

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
