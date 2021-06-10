<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import { Line } from 'vue-chartjs';
import RaceData from '../types/RaceData.vue';

@Component
export default class Race extends Mixins(Line) {
  @Prop(Object)
  readonly raceData: RaceData;

  mounted() {
    this.renderChart(
      {
        labels: ['test'],
        datasets: [
          {
            data: [1, 2, 3, 4],
          },
        ],
      },
      {}
    );
  }
}
</script>
