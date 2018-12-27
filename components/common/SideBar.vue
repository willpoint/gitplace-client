<template>
  <aside class="menu">
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link to="/dashboard">Dashboard</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/logs">Logs</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/branches">Branches</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/files">Files</nuxt-link>
      </li>
      <li><a>Merges</a></li>
      <li><a>Configurations</a></li>
    </ul>
  </aside>
</template>

<style>
  .nuxt-link-exact-active.nuxt-link-active {
    background-color: #333;
    color: #fff;
  }

</style>
