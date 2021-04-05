<template>
  <div class="home">
    <h2>Races</h2>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-left">Track</th>
          <th class="text-left">Link</th>
        </tr>
      </thead>
      <tbody v-if="raceList">
        <tr v-for="race in raceList" :key="race.uid">
          <td>{{ race.startTime }}</td>
          <td>{{ race.track.name }}</td>
          <td>
            <router-link :to="'/race/' + race.uid">View race</router-link>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as RaceService from '../services/RaceService';
import PartialRaceData from '../types/PartialRaceData';

@Component
export default class Race extends Vue {
  raceList: PartialRaceData[] = [];

  async mounted() {
    const raceList = await RaceService.getAllRaces();
    console.log(raceList);
    this.raceList = raceList;
  }
}
</script>
