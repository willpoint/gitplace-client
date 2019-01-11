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
      this.file_content = this.$highlight(data)
      this.name = route.query.name
    }).catch(console.log)
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
