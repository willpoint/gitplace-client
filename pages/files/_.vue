<template>
  <div class="section">
    <p class="title is-6">Project Files - ({{current_file}})</p>
    <div class="columns">
      <div class="column is-4">
        <div class="box">
          <b-table
            :data="fileArray"
            :narrowed="true"
            :hoverable="true">
            <template slot-scope="props">
              <b-table-column field="name" label="Name">
                <git-file
                  :meta="props.row"
                  @file="showFile"
                  @folder="gotoFolder"
                />
              </b-table-column>
              <b-table-column field="type" numeric>
                <span class="tag is-gold">{{props.row.type}}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
      <div class="column is-8">
        <div class="box">
          <pre><code v-html="file_content || 'Click on file to display here'"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GitFile from '@/components/common/File'
export default {
  fetch({store, params}) {
    const pp = params.pathMatch
    return store.dispatch('branches', {
      type: 'files',
      body: 'ls-tree HEAD:' + pp
    })
  },
  computed: {
    ...mapGetters(
      ['files']
    ),
    fileArray() {
      const arr = this.files.split('\n').filter(f => f != '')
      const content = arr.map((a) => {
        let meta = a.split(/[\s\t]/)
        let c = {name: meta[3], sha1: meta[2], type: meta[1]}
        if (c.type === 'tree') {
          c.children = []
        }
        return c
      })
      return content
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
    showFile(name) {
      const pp = this.$route.fullPath.split('/').filter(f => f != '')
      const [, ...rest] = pp
      const file = rest.join('/') + '/' + name
      if (this.current_file === file) return // don't rerender the file
      this.current_file = file
      this.file_content = 'Loading...'
      this.$store.dispatch('file_content', {
        type: 'file_content',
        body: 'ls-files -s -- ' + file
      }).then(resp => {
        const sha1 = resp.data.split(' ')[1]
        return sha1
      }).then(sha1 => {
        return this.$store.dispatch('file_content', {
          type: 'file_content',
          body: 'cat-file ' + sha1 + ' -p'
        })
      }).then(rsp => {
        var ext = file.slice(file.lastIndexOf('.'))
        var excludes = ['.txt', '.md', '.html', '.gitignore', '.gitattributes', '.1']
        if (excludes.includes(ext)) {
          this.file_content = rsp.data
        } else if (file.indexOf('.') == -1) {
          this.file_content = rsp.data
        } else {
          this.file_content = this.$highlight(rsp.data)
        }
      })
    },
    gotoFolder(folder) {
      this.$router.push(this.$route.fullPath+"/"+folder)
    }
  }
}
</script>

<style>

</style>
