<template>
  <aside
    style="position:relative;height:100vh" 
    class="menu">
    <ul class="menu-list">
      <li>
        <nuxt-link to="/dashboard">
          <b-icon icon="chart-bar" size="is-small"></b-icon>
          Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/history">
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
      <li>
        <nuxt-link to="/stash-reflog">
          <b-icon icon="history" size="is-small"></b-icon>
          Stash/Reflog
        </nuxt-link>
      </li>
    </ul>

  </aside>
</template>

<style>
  a.nuxt-link-active {
    background-color: #3eaaaf;
    color: #fff;
  }
  .menu-list a:hover {
    background-color: #fff;
    color: #3eaaaf;
  }
  .sidebar-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }


</style>
