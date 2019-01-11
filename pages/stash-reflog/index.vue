<template>
  <div class="section">
    <b-tabs
      v-model="activeTab"
      @input="handleTabChange"
      type="is-toggle"
      size="is-small"
      position="is-centered">

      <b-tab-item :label="tags[0].name">
        <div class="box data">
          <pre v-html="$convert(output) || 'No information to display'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>

      <b-tab-item :label="tags[1].name">
        <div class="box data">
          <pre v-html="$convert(output) || 'No information to display'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch({store}) {
    return store.dispatch('num_commits', {
      type: 'num_commits',
      body: 'rev-list HEAD --count'
    }).catch(console.log)
  },
  computed: {
    ...mapGetters(['num_commits'])
  },
  data() {
    return {
      isLoading: false,
      doPagination: false,
      output: '',
      title: '',
      currentCommand: '',
      activeTab: 0,
      current: 1,
      perPage: 20,
      tags: [
        {name: 'Stash', command: 'stash show'},
        {name: 'Reflog', command: 'reflog --color'},
      ]
    }
  },
  created() {
    this.handleTabChange(0)
  },
  methods: {
    handleTabChange(num) {
      let data = this.tags[num]
      this.currentCommand = data.command
      this.output = 'Loading...'
      if (data.paginate) {
        this.doPagination = true
        this.current = 1
      } else {
        this.doPagination = false
      }
      this.isLoading = true
      this.$store.dispatch('logs', {type: 'logs', body: data.command})
        .then(({data}) => {
          this.output = data
        }).catch(err => {
          this.output = ''
        }).finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
  .data {
    position: relative;
  }
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
