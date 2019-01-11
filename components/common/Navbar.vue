<template>
  <nav class="navbar is-light">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <p class="title is-6 is-bold">
          GitPlace
          &nbsp; 
          <span class="tag is-white">
            {{ version }}
          </span>
        </p>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a 
          class="navbar-item"
          @click="showAbout">
          About
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item control">
          <b-taglist attached>
            <b-tag type="is-success">toplevel</b-tag>
            <b-tag type="is-white">{{dirname}}</b-tag>
          </b-taglist>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import About from '@/components/common/About'
export default {
  computed: {
    ...mapState(['version'])
  },
  data() {
    return {
      dirname: ''
    }
  },
  methods: {
    showAbout() {
      const vm = this
      vm.$modal.open({
        parent: vm,
        component: About,
        hasModalCard: true,
        props: {
          version: vm.version
        }
      })
    }
  },
  created() {
    this.$store.commit('GET_DATA', {
      type: 'version',
      body: '--version'
    })
    this.$store.dispatch('toplevel', {
      type: 'toplevel',
      body: 'rev-parse --show-toplevel'
    }).then((resp) => {
      this.dirname = resp.data
    })
  }
}
</script>

<style>

</style>
