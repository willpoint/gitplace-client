<template>
  <section>
      <b-field>
        <b-select expanded>
          <option value="flint">Flint</option>
          <option value="silver">Silver</option>
          <option value="vane">Vane</option>
          <option value="billy">Billy</option>
          <option value="jack">Jack</option>
          <option value="heisenberg">Heisenberg</option>
          <option value="jesse">Jesse</option>
          <option value="saul">Saul</option>
          <option value="mike">Mike</option>
        </b-select>
      </b-field>
      <button
        type="button" 
        class="button is-small is-warning"
        @click="handleCheckout">
        Go
      </button>
    </section>
</template>

<script>
export default {
  props: {
    data: String,
  },
  computed: {
    branches() {
      return this.data.split('\n')
    },
    current() {
      return "current"
    }
  },
  methods: {
    handleCheckout() {
      this.$emit('checkout', 'branchname')
    }
  }
}
</script>

<style>

</style>
