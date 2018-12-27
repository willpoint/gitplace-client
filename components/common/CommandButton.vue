<template>
  <p class="control">
    <button
      @click="handleClick" 
      class="button is-small is-dark is-outlined">
      {{ name }}
    </button>
  </p>
</template>

<script>
export default {
  props: {
    name: String,
    command: String,
    type: String,
  },
  methods: {
    handleClick() {
      this.$emit('clicked', {
        type: 'data',
        body: this.command
      })
    }
  }
}
</script>

<style>

</style>
