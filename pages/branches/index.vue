<template>
  <div class="section">
    <div class="columns">
      <div class="column is-3">
        <div class="box">
          <p class="title tag is-white is-6">Project Branches</p>
          <div>
            <b-taglist>
              <b-tag
                v-for="(c, i) in filteredBranches"
                :key="i" 
                type="is-warning">
                {{ c }}
              </b-tag>
            </b-taglist>
          </div>
        </div>
      </div>
      <div class="column is-9">
        <div class="box">
          <p class="title is-6">
            Checkout Branch
          </p>
          <form @submit.prevent="handleCheckout">
            <b-field>
              <b-select 
                placeholder="Select a branch"
                v-model="branch">
                <option
                  v-for="(b, i) in choice"
                  :key="i"
                  :value="b">
                  {{ b }}
                </option>
              </b-select>
            </b-field>
            <button 
              class="button is-small is-gold"
              @click="handleCheckout">
              Checkout
            </button>
          </form>
          <div>
            <pre>{{ notification }}</pre>
          </div>
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
      type: 'branches',
      body: 'branch'
    })
  },
  data() {
    return {
      branch: null
    }
  },
  computed: {
    ...mapGetters({
      branches: 'branches',
      notification: 'notification'
    }),
    choice() {
      const b = this.branches.split('\n')
      const cc = b.filter(v => v != '' && !v.includes('*'))
      return cc
    },
    filteredBranches() {
      const b = this.branches.split('\n')
      return b.filter(v => v != '')
    }
  },
  methods: {
    handleCheckout() {
      this.$store.commit('GET_DATA', {
        type: 'notification',
        body: 'checkout ' + this.branch
      })
      this.$store.commit('GET_DATA', {
        type: 'branches',
        body: 'branch'
      })
    }
  }
}
</script>

<style>

</style>
