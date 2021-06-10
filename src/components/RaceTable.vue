<template>
  <v-simple-table dense>
    <thead>
      <tr>
        <th class="text-left"></th>
        <th class="text-left">Team</th>
        <th class="text-left">Start position</th>
        <th class="text-left">Positions gained</th>
        <th class="text-left">Gap</th>
        <th class="text-left">Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in this.raceData.results" :key="result.id">
        <td class="flex-row">
          <div class="position mr-2">
            <div>{{ result.position }}</div>
          </div>
          <div :style="getTeamColor(result.teamName)" class="team-color mr-2" />
          <span class="v-center bold">{{ result.driverName }}</span>
        </td>
        <td>{{ result.teamName }}</td>
        <td class="bold">{{ result.startPosition }}</td>
        <td class="bold">{{ result.startPosition - result.position }}</td>
        <td class="bold">{{ `+${diffToWinner(result)}s` }}</td>
        <td class="bold">{{ result.points }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RaceData from '../types/RaceData';
import teamColors from '@/data/teamColors';

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

  getTeamColor(teamName: string) {
    return {
      background: teamColors[teamName],
    };
  }
}
</script>

<style scoped>

table tbody td {
  border-bottom: none !important;
  font-size: 1.2rem !important;
}

.position {
  background-color: white;
  color: #333;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0px 0px 6px;
  font-weight: bold;
  font-size: 1.3rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.team-color {
  width: 5px;
  height: calc(100% - 12px);
  background: red;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.bold{
  font-weight: 600;
}
</style>