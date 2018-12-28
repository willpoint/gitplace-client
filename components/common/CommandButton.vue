<template>
  <p @click="handleClick">
    {{ name }}
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
