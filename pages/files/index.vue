<template>
  <div class="section">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <pre v-html="$convert(files)"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch({store}) {
    return store.dispatch('branches', {
      type: 'files',
      body: 'ls-files'
    })
  },
  computed: {
    ...mapGetters({
      files: 'files'
    })
  }
}
</script>

<style>

</style>
