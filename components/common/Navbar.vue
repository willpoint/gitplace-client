<template>
  <nav class="navbar is-primary">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <p class="title is-6 has-text-light is-bold">
          GITPLACE 
          <span class="tag is-light is-rounded">
            {{ version }}
          </span>
        </p>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        
        <a class="navbar-item">
          Documentation
        </a>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'version'
    ])
  },
  created() {
    this.$store.commit('GET_DATA', {
      type: 'version',
      body: '--version'
    })
  }
}
</script>

<style>

</style>
