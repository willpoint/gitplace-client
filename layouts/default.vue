<template>
  <div class="default">
    <nav-bar />
    <div style="position:relative;">
      <div class="sidebar">
        <div class="">
          <side-bar />
        </div>
      </div>
      <div class="main">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar'
import SideBar from '@/components/common/Sidebar'
export default {
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style>
  .default {
    min-height: 100vh;
    background-color: #f0efe7;
  }
  .sidebar {
    position: absolute;
    background-color: #dad4a4;
    padding: 15px;
    min-height: 95vh;
    top: 0;
    bottom: 0;
    width: 190px;
  }
  .main {
    margin-left: 190px;
  }
</style>
