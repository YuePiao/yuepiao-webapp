<template lang='pug'>
  .main-page
    .menu-wrapper
      el-menu.primary-menu(theme='dark')
        .menu-title Yue Piao
        .menu-body
          router-link(v-for='menu in menus', key='menu.index', :to='{ name: menu.index }')
            el-menu-item(:index='menu.index')
              i(:class='menu.icon')
              | {{ menu.text }}
        .menu-footer
          el-menu-item(index='Signout', @click='handleSignout')
            i.el-icon-setting
            | 注销
    router-view.primary-content
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    menus () {
      return [{
        index: 'Movies',
        icon: 'el-icon-message',
        text: '电影',
      }, {
        index: 'FriendMoments',
        icon: 'el-icon-menu',
        text: '动态',
      }, {
        index: 'Account',
        icon: 'el-icon-setting',
        text: '用户',
      }]
    },
  },
  created () {
    this.readFromStorage()
      .then(({ accessToken, currentUser }) => {
        if (!accessToken && !currentUser) {
          this.$router.push({
            name: 'Movie'
          })
        }
      })
  },
  methods: {
    handleSignout () {
      this.signout()
    },
    ...mapActions([
      'signout',
      'saveToStorage',
      'readFromStorage',
    ]),
  },
}
</script>

<style>
.main-page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}

.menu-wrapper {
  flex: none;
  width: 10rem;
}

.primary-menu {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.primary-menu a {
  text-decoration: none !important;
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
