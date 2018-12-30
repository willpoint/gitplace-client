<template>
  <b-field expanded>
    <b-input
      size="is-small"
      icon="file"
      :value="name" 
      readonly
      expanded>
    </b-input>
    <p class="control">
      <button 
        class="button is-small is-dark"
        @click="viewHistory">
        <b-icon 
          icon="history" 
          size="is-small"
        />
      </button>
    </p>
    <p class="control">
      <button 
        class="button is-small is-gold"
        @click="viewFile">
        view
      </button>
    </p>
  </b-field>
</template>

<script>
export default {
  props: {
    name: String
  },
  methods: {
    viewHistory() {
      this.$emit('history', this.name)
    },
    viewFile() {
      this.$emit('file', this.name)
    }
  }
}
</script>

<style>

</style>
