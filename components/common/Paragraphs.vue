<template>
  <div>
    <p 
      v-for="(p, i) in paragraphs"
      :key="i">
      {{ p }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    paragraphs: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
