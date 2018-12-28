<template>
  <div class="section">
    <b-tabs
      v-model="activeTab">
      <b-tab-item 
        label="Pictures" 
        icon="google-photos"
      />
      <b-tab-item 
        label="Music" 
        icon="library-music"
      />
      <b-tab-item 
        label="Videos" 
        icon="video"
      />
    </b-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch({store}) {
    return store.dispatch('shortlog', {
      type: 'shortlog',
      body: 'shortlog commit'
      // body: 'rev-list HEAD --count'
    })
  },
  data() {
    return {
      activeTab: 0
    }
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
