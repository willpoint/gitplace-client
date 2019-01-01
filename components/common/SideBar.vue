<template>
  <aside
    style="position:relative;height:90vh" 
    class="menu">
    <p class="menu-label">
      Revisions
    </p>
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
    </ul>

    <div class="poweredby">
      <div class="box">
        <p>
          GitPlace by Uzondu Enudeme
        </p>
        <p>
          &lt;willpoint@gmail.com&gt;
        </p>
      </div>
    </div>

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
  .poweredby {
    display: none;
    position: fixed;
    bottom: 5rem;
    height: 30px;
    border-radius: 3px;
    padding: 2px;
    font-size: 12px;
    width: 12.5rem;
  }

</style>
