<template>
  <div class="section">
    <b-tabs
      v-model="activeTab"
      type="is-toggle-rounded"
      size="is-small"
      position="is-centered"
      >
      <b-tab-item>
        <template slot="header">
          <command-button
            command="status"
            name="Status"
            @clicked="handleClick"
          />
        </template>
        <div
          style="position:relative" 
          class="box">
          <pre 
            v-html="$convert(output) || 'No information to display'" 
          />
          <b-loading
            class="loading" 
            :is-full-page="false" 
            :active.sync="isLoading" 
          />
        </div>
      </b-tab-item>

      <b-tab-item>
        <template slot="header">
          <command-button
            command="log --max-count=20 --skip=0 --color --ignore-all-space --stat --abbrev-commit --date=local"
            name="Commit Log"
            @clicked="(data) => handleClick(data, true)"
          />
        </template>
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

      <b-tab-item>
        <template slot="header">
          <command-button
            command="log --max-count=20 --skip=0 --color --graph --ignore-all-space --abbrev-commit --pretty=oneline --date=local"
            name="Commit Graph"
            @clicked="(data) => handleClick(data, true)"
          />
        </template>
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
      <b-tab-item>
        <template slot="header">
          <command-button
            command="diff HEAD^ HEAD --color --ignore-all-space"
            name="Last Commit Diff"
            @clicked="handleClick"
          />
        </template>
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

      <b-tab-item>
        <template slot="header">
          <command-button
            command="diff --cached --color --ignore-all-space"
            name="Uncommitted Code"
            @clicked="handleClick"
          />
        </template>
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

      <b-tab-item>
        <template slot="header">
          <command-button
            command="config -l"
            name="View Config"
            @clicked="handleClick"
          />
        </template>
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
      output: '',
      title: '',
      doPagination: false,
      current: 1,
      currentCommand: '',
      perPage: 20,
      activeTab: 0
    }
  },
  components: {
    CommandButton,
    PTexts
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
