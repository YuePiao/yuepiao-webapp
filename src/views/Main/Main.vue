<template lang='pug'>
  .main-page
    el-menu.primary-menu(theme='dark', router)
      el-menu-item(v-for='menu in menus', key='menu.index', :index='menu.index')
        i(:class='menu.icon')
    router-view.primary-content
</template>

<script>
export default {
  data () {
    return {
      menus: [{
        index: '/movies',
        icon: 'el-icon-picture',
      }, {
        index: '/moments',
        icon: 'el-icon-menu',
      }, {
        index: '/account',
        icon: 'el-icon-information',
      }],
    }
  },
}
</script>

<style>
.main-page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.primary-menu {
  flex: none;
  width: 4rem;
  height: 100%;
  border-radius: 0;
}

.primary-content {
  flex: auto;
}

</style>
