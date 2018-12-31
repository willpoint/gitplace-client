<template>
  <div class="section">
    <div class="box">
      <summary-chart 
        :chart-data="summary"
        :option="options"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SummaryChart from '@/components/charts/Pie'
export default {
  fetch({store}) {
    return store.dispatch('shortlog', {
      type: 'shortlog',
      body: 'shortlog --summary --numbered HEAD'
    })
  },
  data() {
    return {
      options: {
        responsive: false,
        legend: {
          display: false
        }
      }
    }
  },
  computed: {
    ...mapGetters(['shortlog']),
    summary() {
      const chartData = {
        labels: [],
        datasets: [{
          label: '# of Contributions',
          data: [],
          backgroundColor: []
        }]
      }
      const contribs = this.shortlog.split('\n')
        .filter(v => v != '')

      for (let i = 0; i < contribs.length; i++) {
        // show chart for top 50 contributions
        if (i == 49) break;
        let c = contribs[i]
        let contrib = c.trim().split('\t')
        chartData.datasets[0].data.push(Number(contrib[0]))
        chartData.datasets[0].backgroundColor.push('#dbd49b')
        chartData.labels.push(contrib[1])
      }
      return chartData
    }
  },
  components: {
    SummaryChart
  }
}
</script>

<style>

</style>
