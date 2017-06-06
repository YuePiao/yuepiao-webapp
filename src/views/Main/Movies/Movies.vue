<template lang='pug'>
  .movies-page
    el-menu.secondary-menu
      router-link(v-for='menu in menus', key='menu.index', to='temp')
        el-menu-item(:index='menu.index.toString()') {{ menu.text }}
    router-view.secondary-content
</template>

<script>
export default {
  data () {
    return {
      menus: [{
        index: 0,
        text: '0',
      }, {
        index: 1,
        text: '1',
      }, {
        index: 2,
        text: '2',
      }],
    }
  },
}
</script>

<style>

</style>
