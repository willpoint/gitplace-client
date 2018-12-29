<template>
  <div class="section">
    {{ shortlog }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch({store}) {
    return store.dispatch('shortlog', {
      type: 'shortlog',
      body: 'shortlog -s -n'
    })
  },
  computed: {
    ...mapGetters(['shortlog'])
  }
}
</script>

<style>

</style>
