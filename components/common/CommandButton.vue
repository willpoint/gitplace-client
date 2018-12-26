<template>
  <p class="control">
    <button
      @click="handleClick" 
      class="button is-primary is-outlined">
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
      const type = this.type || this.command.trim().split(' ')[0]
      this.$emit('clicked', {
        type: type,
        body: this.command
      })
    }
  }
}
</script>

<style>

</style>
