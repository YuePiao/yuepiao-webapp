<template lang='pug'>
  .main-page
    .primary-menu
      el-menu.menu(theme='dark')
        .menu-title Yue Piao
        .menu-body
          router-link(v-for='menu in menus', key='menu.index', :to='{ name: menu.index }')
            el-menu-item(:index='menu.index')
              i(:class='menu.icon')
              | {{ menu.text }}
        .menu-footer
          el-menu-item(index='Signout')
            i.el-icon-setting
            | 注销
    router-view.primary-content
</template>

<script>
export default {
  data () {
    return {
      menus: [{
        index: 'Movies',
        icon: 'el-icon-message',
        text: '电影',
      }, {
        index: 'Moments',
        icon: 'el-icon-menu',
        text: '动态',
      }, {
        index: 'Account',
        icon: 'el-icon-setting',
        text: '用户',
      }],
    }
  },
}
</script>

<style>
.main-page, .movies-page, .moments-page, .account-page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}

.primary-menu, {
  flex: none;
  width: 10rem;
}

.menu {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.primary-menu .menu-title, .primary-menu .menu-footer {
  flex: none;
}

.primary-menu .menu-body, .primary-content, .secondary-content {
  flex: auto;
}

.menu-title {
  color: #bfcbd9;
  padding: 20px;
  font-size: x-large;
}
</style>
