<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title is-6">About GitPlace</p>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <p>
          GitPlace is a tool to understand the history of a Git 
        </p>
        <p>
        repository in a read-only, simple interface.
        </p>
        Send suggestions to the developer at - willpoint@gmail.com
          
      </div>
      <p class="title is-6">GitPlace is running {{ version }}</p>
    </section>
    
  </div>
</template>

<script>
export default {
  props: {
    version: String
  }
}
</script>

<style>

</style>
