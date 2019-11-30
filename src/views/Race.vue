<template>
  <div class="home">
    <h2>Race</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RaceData from '../types/RaceData';
import * as RaceService from '../services/RaceService';

@Component
export default class Race extends Vue {
  @Prop()
  raceData?: RaceData;

  async mounted() {
    this.raceData = await RaceService.getRace('1');
  }
}
</script>
