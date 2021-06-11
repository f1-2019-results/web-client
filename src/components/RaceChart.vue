<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Line } from 'vue-chartjs';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import RaceData from '../types/RaceData';
import teamColors from '@/data/teamColors';

Chart.defaults.global.defaultFontColor = '#fff';

@Component
export default class Race extends Mixins(Line) {
  @Prop(Object)
  readonly raceData: RaceData;

  mounted() {
    this.addPlugin(ChartDataLabels);

    const graphData = this.calculateGraphData(this.raceData);
    console.log(graphData);

    // FIXME: Refactor
    const resultsSortedByTeamName = [...this.raceData.results].sort((a, b) =>
      a.teamName.localeCompare(b.teamName)
    );

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
        xAxes: [
          {
            scaleLabel: {
              labelString: 'Lap',
              display: true,
            }
          }
        ]
      },
      layout: {
        padding: 5,
      },
      animation: { duration: 0 },
      plugins: {
        datalabels: {
          color: 'white',
          backgroundColor: '#333',
          borderColor: (context) => {
            return context.dataset.borderColor as string;
          },
          borderRadius: 16,
          borderWidth: 3,
          font: {
            weight: 'bold',
            size: 14,
          },
          padding: {
            left: 6,
            right: 6,
            bottom: 1,
          },
          formatter: (value, context) => {
            const result = resultsSortedByTeamName[context.datasetIndex];
            const lap = result.laps[context.dataIndex];
            if (lap && lap.pit) return 'P';
            return null;
          },
        },
      },
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
        datalabels: {
          align: 'center',
          anchor: 'center',
        },
        cubicInterpolationMode: 'monotone',
      })),
    };
  }
}
</script>
