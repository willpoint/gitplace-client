<template>
  <div class="section">
    <p class="title is-6">Project Files</p>
    <div class="columns">
      <div class="column is-5">
        <div class="box">
          <git-file
            v-for="(f, i) in fileArray"
            :key="i"
            :name="f"
            @history="showHistory"
            @file="showFile"
          />
        </div>
      </div>
      <div class="column is-7">
        <div class="box">
          <p class="title is-6">{{ current_file }}</p>
          <pre><code>{{ file_content || 'Click view to see the content of a file' }}</code></pre>
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
      ['files']
    ),
    fileArray() {
      return this.files.split('\n').filter(f => f != '')
    }
  },
  components: {
    GitFile
  },
  data() {
    return {
      file_content: '',
      current_file: ''
    }
  },
  methods: {
    showFile(file) {
      this.current_file = file
      return new Promise((resolve, reject) => {
        this.$store.dispatch('file_content', {
          type: 'file_content',
          body: 'ls-files -s -- ' + file
        }).then(resp => {
          const sha1 = resp.data.split(' ')[1]
          this.$store.dispatch('file_content', {
              type: 'file_content',
              body: 'cat-file ' + sha1 + ' -p'
            }).then((rsp) => {
              this.file_content = rsp.data
            })
        })
      })
    },
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
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
