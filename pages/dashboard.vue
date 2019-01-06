<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <p class="title is-6">Contributions ({{total}})</p>
        <b-table
          :data="contributions"
          :striped="true"
          :narrowed="true"
          :hoverable="true"
          :paginated="true"
          :per-page="perPage"
          :total="total"
          :current-page.sync="currentPage"
          pagination-size="is-small"
          :pagination-simple="false">

          <template slot-scope="props">
            <b-table-column field="name" label="Name">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="email" label="Email">
              {{ props.row.email }}
            </b-table-column>

            <b-table-column field="contrib" label="#" numeric>
              <span class="tag is-gold">
                {{ props.row.contribs }}
              </span>
            </b-table-column>
          </template>
        </b-table>
      </div>
      <div class="column is-6">
        <div class="box">
          <p class="title is-6">Top Contributors ( &lt;= 50 )</p>
          <summary-chart 
            :chart-data="summary"
            :options="options"
            :height="450"
          />
        </div>
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
      body: 'shortlog --summary --numbered --email HEAD'
    })
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'top'
        }
      },
      perPage: 20,
      currentPage: 1,
    }
  },
  computed: {
    ...mapGetters(['shortlog']),
    contributions() {
      const contribs = this.shortlog.split('\n').filter(v => v != '')
      const ret = []
      for (let i = 0; i < contribs.length; i++) {
        let contrib = contribs[i].trim().split('\t')
        let identity = contrib[1].split(' ')
        let email = identity[identity.length-1]
        let name = contrib[1].slice(0, -(email.length))
        
        let one = {}
        one["name"] = name
        one["email"] = email.replace(/[<>]/g, '')
        one["contribs"] = contrib[0]
        ret.push(one)
      }
      return ret
    },
    total() { return this.shortlog.split('\n').filter(v => v != '').length },
    summary() {
      const chartData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      }
      const contribs = this.shortlog.split('\n').filter(v => v != '')
      for (let i = 0; i < contribs.length; i++) {
        // show chart for top 50 contributions
        if (i == 49) break;

        let contrib = contribs[i].trim().split('\t')

        chartData.datasets[0].data.push(Number(contrib[0]))
        
        // generate a color based on contribution value
        // using r = 50, and varying g and b with values of contribution
        // ANDing the values of contribution to keep it from overflowing 0xff
        let color = "rgba(50," + (+contrib[0]&0xff) + "," + ((+contrib[0]*123)&0xff) + ",1)"
        chartData.datasets[0].backgroundColor.push(color)
        
        // exclude email address from name
        let identity = contrib[1].split(' ')
        let email = identity[identity.length-1]
        let name = contrib[1].slice(0, -(email.length))
        chartData.labels.push(name)
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
