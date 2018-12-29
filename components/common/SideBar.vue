<template>
  <aside
    style="position:relative;height:90vh" 
    class="menu">
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link to="/dashboard">
          <b-icon icon="chart-bar" size="is-small"></b-icon>
          Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/logs">
          <b-icon icon="delta" size="is-small"></b-icon>
          History
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/refs">
          <b-icon icon="tag-multiple" size="is-small"></b-icon>
          Refs
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/files">
          <b-icon icon="file" size="is-small"></b-icon>
          Files
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<style>
  .nuxt-link-exact-active.nuxt-link-active {
    background-color: #333;
    color: #fff;
  }
  .sidebar-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
