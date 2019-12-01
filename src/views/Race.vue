<template>
  <div class="home">
    <h2>Race</h2>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Position</th>
          <th class="text-left">Name</th>
          <th class="text-left">Team</th>
          <th class="text-left">Time</th>
          <th class="text-left">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Max Verstappen</td>
          <td>Red Bull Racing</td>
          <td>1:33:14.678</td>
          <td>25</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Pierre Gasly</td>
          <td>Toro Rosso</td>
          <td>+6.077s</td>
          <td>18</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Carlos Sainz</td>
          <td>McLaren</td>
          <td>+8.896</td>
          <td>15</td>
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
  raceData?: RaceData;

  async mounted() {
    this.raceData = await RaceService.getRace('1');
  }
}
</script>
