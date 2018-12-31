<template>
  <div class="section">
    <div class="columns">
      <div class="column is-7">
        <div class="box">
          <p class="title is-6">Top 50 Contributors</p>
          <summary-chart 
            :chart-data="summary"
            :option="options"
          />
        </div>
      </div>
      <div class="column is-5">
        <!-- table for all contributions -->
      </div>
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
      }
    }
  },
  computed: {
    ...mapGetters(['shortlog']),
    summary() {
      const chartData = {
        labels: [],
        datasets: [{
          label: 'Top 50 Contributions',
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
        // generate a color based on contribution value
        // using r = 50, and varying g and b with values of contribution
        // ANDing the values of contribution to keep it from overflowing 0xff
        let color = "rgba(50, " + (+contrib[0] & 0xff) + ", " + ((+contrib[0] * 123) & 0xff) + ", 1)"
        chartData.datasets[0].backgroundColor.push(color)
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
