<template>
  <div class="section">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <b-table
            :data="fileArray"
            :selected.sync="selected"
            :narrowed="true"
            :hoverable="true">
            <template slot-scope="props">
              <b-table-column field="name" label="Name">
                <git-file
                  style="font-size:14px"
                  :meta="props.row"
                  @file="showFile"
                  @folder="gotoFolder"
                />
              </b-table-column>
              <b-table-column field="type" numeric>
                <span class="tag is-success">{{props.row.type}}</span>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GitFile from '@/components/common/File'
export default {
  fetch({store}) {
    return store.dispatch('branches', {
      type: 'files',
      body: 'ls-tree HEAD'
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
        return {name: meta[3], sha1: meta[2], type: meta[1]}
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
      current_file: '',
      selected: {}
    }
  },
  methods: {
    showFile(file) {
      if (this.current_file === file) return // don't rerender the file
      this.current_file = file
      this.file_content = 'Loading...'
      this.$store.dispatch('file_content', {
        type: 'file_content',
        body: 'ls-files -s -- ' + file
      }).then(resp => {
        const sha1 = resp.data.split(' ')[1]
        this.$router.push('/files/blob/'+sha1 + '?name=' + file)
      })
    },
    gotoFolder(folder) {
      this.$router.push(this.$route.fullPath + "/" + folder)
    }
  }
}
</script>

<style>

</style>
