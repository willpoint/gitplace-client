<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title has-text-dark is-6">GitPlace</p>
    </header>
    <section class="modal-card-body">
      <div class="content has-text-centered">
        <div class="has-text-dark is-6">
          GitPlace is a tool to understand/explore the history of a software project <br />
          that uses Git as it's VCS in a read-only, simple interface.
          <div class="version-control">
            <img 
              src="~assets/undraw_version_control_9bpv.svg" 
              alt="version control"
            />
          </div>
          Send suggestions to the developer at 
          <a 
            href="mailto:willpoint@gmail.com">
            willpoint@gmail.com
          </a>
        </div>
        <hr />     
        <small class="tag is-light is-6">Just like Git, GitPlace is free to use</small>
      </div>
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
  .version-control {
    display: flex;
    height: 200px;
    width: 200px;
    margin: 0 auto;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

</style>
