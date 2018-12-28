<template>
  <div class="section">
    <b-tabs
      v-model="activeTab"
      @input="handleTabChange"
      type="is-toggle-rounded"
      size="is-small"
      position="is-centered">
      <b-tab-item label="Status">
        <div
          style="position:relative" 
          class="box">
          <pre v-html="$convert(output) || 'No information to display'" />
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>
      <b-tab-item label="Commit Log">
        <div
          style="position:relative" 
          class="box">
          <pre v-html="$convert(output) || 'No information to display'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
        <div class="box">
          <b-pagination
            v-if="doPagination"
            type="is-dark"
            size="is-small"
            :total="num_commits"
            :current.sync="current"
            @change="handlePageChange"
          />
        </div>
      </b-tab-item>
      <b-tab-item label="Commit Graph">
        <div
          style="position:relative" 
          class="box">
          <pre v-html="$convert(output) || 'No information to display'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
        <div class="box">
          <b-pagination
            v-if="doPagination"
            type="is-dark"
            size="is-small"
            :total="num_commits"
            :current.sync="current"
            @change="handlePageChange"
          />
        </div>
      </b-tab-item>
      <b-tab-item label="Config">
        <div
          style="position:relative" 
          class="box">
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
import CommandButton from '@/components/common/CommandButton'
import PTexts from '@/components/common/Paragraphs'
import { mapGetters } from 'vuex'
export default {
  fetch({store}) {
    return store.dispatch('num_commits', {
      type: 'num_commits',
      body: 'rev-list HEAD --count'
    })
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
        {name: 'Status', command: 'status'},
        {name: 'Commit Log', command: 'log --max-count=20 --skip=0 --color --stat --abbrev-commit --date=local', paginate: true},
        {name: 'Commit Graph', command: 'log --max-count=20 --skip=0 --color --graph --abbrev-commit --pretty=oneline --date=local', paginate: true},
        {name: 'Config', command: 'config -l'}
      ]
    }
  },
  components: {
    CommandButton,
    PTexts
  },
  created() {
    this.handleTabChange(0)
  },
  methods: {
    handleClick(data, paginate) {
      this.currentCommand = data.body
      this.output = 'Loading...'
      if (paginate) this.doPagination = true
      else this.doPagination = false
      this.isLoading = true
      this.$store.dispatch('logs', data)
        .then(({data}) => {
          this.output = data
          this.isLoading = false
        })
    },
    handlePageChange(a) {
      this.isLoading = true
      return new Promise((resolve, reject) => {
        let skip = (Number(a) - 1) * this.perPage
        const skipRegex = /--skip=(\d+)/g
        const newCmd = this.currentCommand.replace(skipRegex, "--skip="+skip)
        this.$store.dispatch('logs', {
          type: 'logs',
          body: newCmd
        }).then(({data}) => {
          this.output = data
          this.isLoading = false
        })
      })
    },
    handleTabChange(num) {
      let data = this.tags[num]
      this.currentCommand = data.command
      this.output = 'Loading...'
      if (data.paginate) this.doPagination = true
      else this.doPagination = false
      this.isLoading = true
      this.$store.dispatch('logs', {type: 'logs', body: data.command})
        .then(({data}) => {
          this.output = data
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
