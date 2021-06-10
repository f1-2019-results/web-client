<script lang="ts">
import { Vue, Component, Prop, Mixins } from 'vue-property-decorator';
import { Line } from 'vue-chartjs';
import { Chart } from 'chart.js';
import RaceData from '../types/RaceData';

@Component
export default class Race extends Mixins(Line) {
  @Prop(Object)
  readonly raceData: RaceData;

  mounted() {
    const graphData = this.calculateGraphData(this.raceData);
    console.log(graphData);
    this.renderChart(graphData, {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              reverse: true,
              // Needed because otherwise the #1 place line won't be visible
              // So display invisible 0 label on top
              beginAtZero: true,
              maxTicksLimit: 21,
              callback:  (tick, index, array) => index === 0 ? '' : tick,
            },
          },
        ],
      },
      layout: {
        padding: 5,
      },
    });
  }

  calculateGraphData(raceData: RaceData): Chart.ChartData {
    return {
      labels: raceData.results[0].laps.map((result, i) => i + 1),
      datasets: raceData.results.map((result) => ({
        data: [result.startPosition].concat(
          result.laps.map((lap) => lap.position)
        ),
        fill: false,
        label: result.driverName,
      })),
    };
  }
}
</script>
