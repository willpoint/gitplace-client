<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-gold is-6">GitPlace</p>
    </header>
    <section class="modal-card-body">
      <div class="content">
        <div class="has-text-dark is-6">
          GitPlace is a tool to understand the history of a Git <br/>
          repository in a read-only, simple interface.
          <hr />
          Send suggestions to the developer at 
          <a 
            href="mailto:willpoint@gmail.com">
            willpoint@gmail.com
          </a>
        </div>         
      </div>
      <p class="title tag is-light is-6">GitPlace is free to use</p>
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
