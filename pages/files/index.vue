<template>
  <div class="section">
    <p class="title is-6">Project Files</p>
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <git-file
            v-for="(f, i) in fileArray"
            :key="i"
            :name="f"
            @history="showHistory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GitFile from '@/components/common/File'
import FileHistory from '@/components/common/FileHistory'
export default {
  fetch({store}) {
    return store.dispatch('branches', {
      type: 'files',
      body: 'ls-files'
    })
  },
  computed: {
    ...mapGetters(
      ['files', 'file_history', 'diff', 'commit_output']
    ),
    fileArray() {
      return this.files.split('\n').filter(f => f != '')
    }
  },
  components: {
    GitFile
  },
  methods: {
    showHistory(file) {
      const vm = this
      Promise.all([
        vm.$store.dispatch('file_history', {
          type: 'file_history',
          body: 'log --follow --abbrev-commit --stat --color -- ' + file
        }),
        vm.$store.dispatch('diff', {
          type: 'diff',
          body: 'diff --cached'
        })
      ]).then(([fh, df]) => {
        vm.$modal.open({
          parent: vm,
          component: FileHistory,
          hasModalCard: true,
          props: {
            name: file,
            diff: df.data,
            file_history: fh.data
          },
          events: {
            commit: function(message, name) {
              vm.$store.commit({
                type: 'commit_output',
                body: 'commit -m ' + message + ' ' + name
              })
              this.$snackbar.open({
                duration: 5000,
                message: 'Snackbar with red action, positioned on bottom-left and a callback',
                type: 'is-danger',
                position: 'is-bottom-left',
                actionText: 'Undo',
                queue: false,
                onAction: () => {
                  this.$toast.open({
                    message: 'Action pressed',
                    queue: false
                  })
                }
              })
            }
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
