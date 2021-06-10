<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Line } from 'vue-chartjs';
import { Chart } from 'chart.js';
import RaceData from '../types/RaceData';
import teamColors from '@/data/teamColors';

Chart.defaults.global.defaultFontColor = '#fff';

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
              callback: (tick, index, array) => (index === 0 ? '' : tick),
            },
          },
        ],
      },
      layout: {
        padding: 5,
      },
      animation: { duration: 0 },
    });
  }

  calculateGraphData(raceData: RaceData): Chart.ChartData {
    const resultsSortedByTeamName = [...this.raceData.results].sort((a, b) =>
      a.teamName.localeCompare(b.teamName)
    );
    return {
      labels: [0].concat(raceData.results[0].laps.map((result, i) => i + 1)),
      datasets: resultsSortedByTeamName.map((result, j) => ({
        data: [result.startPosition].concat(
          result.laps.map((lap) => lap.position)
        ),
        fill: false,
        label: result.driverName,
        backgroundColor: teamColors[result.teamName],
        borderColor: teamColors[result.teamName],
        borderDash: j % 2 === 0 ? undefined : [4, 3],
      })),
    };
  }
}
</script>
