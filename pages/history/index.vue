<template>
  <div class="section">
    <b-tabs
      v-model="activeTab"
      @input="handleTabChange"
      type="is-toggle"
      size="is-small"
      position="is-centered">
      <b-tab-item label="Last Change-Set">
        <div class="data">
          <pre v-html="$convert(output) || 'No information to display'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>
      <b-tab-item label="Commit Log">
        <div class="box data">
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
        <div class="box data">
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
      <b-tab-item label="WorkTree Changes">
        <div class="box data">
          <pre v-html="$convert(output) || 'No changes made in your working directory.'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>
      <b-tab-item label="Uncommitted Changes">
        <div class="box data">
          <pre v-html="$convert(output) || 'No changes added for the next commit.'"></pre>
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>
      <b-tab-item label="Status">
        <div class="box data">
          <pre v-html="$convert(output)" />
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
        {name: 'Last Changeset', command: 'diff --color HEAD^ HEAD'},
        {name: 'Commit Log', command: `log --max-count=20 --skip=0 --color --stat --abbrev-commit --date=local`, paginate: true},
        {name: 'Commit Graph', command: "log --max-count=20 --skip=0 --color --graph --abbrev-commit --pretty=format:%Cred%h%Creset[%Cgreen%an%Creset](%Cblue%ar%Creset)%s", paginate: true},
        {name: 'WorkTree Changes', command: "diff HEAD --color"},
        {name: 'Uncommitted Changes', command: "diff HEAD --cached --color"},
        {name: 'Status', command: 'status'}
      ]
    }
  },
  created() {
    this.handleTabChange(0)
  },
  methods: {
    handlePageChange(a) {
      this.isLoading = true
      let skip = (Number(a) - 1) * this.perPage
      const skipRegex = /--skip=(\d+)/g
      const newCmd = this.currentCommand.replace(skipRegex, "--skip="+skip)
      this.$store.dispatch('logs', {
        type: 'logs',
        body: newCmd
      }).then(({data}) => {
        this.output = data
      }).catch(err => {
        this.output = err.message
      }).finally(() => {
        this.isLoading = false
      })
    },
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
          this.output = 'There is no previous commit to generate a change set'
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
