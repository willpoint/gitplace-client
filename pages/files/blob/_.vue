<template>
  <div class="section">
    <button
      class="button is-dark is-small"
      @click="goBack">
      back
    </button>
    <hr />
    <p class="title is-6">{{ name }}</p>
    <div class="box">
      <pre><code v-html="file_content"></code></pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created() {
    let route = this.$route
    let sha = route.params.pathMatch
    this.$store.dispatch('file_content', {
      type: 'file_content',
      body: 'cat-file ' + sha + ' -p' 
    }).then(({data}) => {
      this.name = route.query.name
      // lets try to make texts show up better
      let excludes = [
        '.txt', '.md', '.gitignore', '.gitattributes',
        '.1', '.rst', 
      ]
      let idx = this.name.lastIndexOf('.')
      let ext = this.name.slice(idx)
      if (idx < 0) {
        this.file_content = data
      } else if (excludes.includes(ext)) {
        this.file_content = data
      } else {
        this.file_content = this.$highlight(data, ext)
      }
    }).catch(err => {
      this.file_content = 'an unexpected error has occured!'
    })
  },
  data() {
    return {
      name: '',
      file_content: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
