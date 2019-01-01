<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">File - {{ name }}</p>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <pre v-html="$convert(file_history)"></pre>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    diff: String,
    file_history: String
  }
}
</script>

<style>

</style>
