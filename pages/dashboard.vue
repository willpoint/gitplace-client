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
      body: 'shortlog -n -s'
    })
  },
  computed: {
    ...mapGetters({
      shortlog: 'shortlog'
    })
  }
}
</script>

<style>

</style>
