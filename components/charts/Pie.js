import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}

/**
 * export default {
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter
}

 */
