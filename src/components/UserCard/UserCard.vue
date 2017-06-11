<template lang='pug'>
.user-card
  .user-card__avatar(@click='goToUser()')
    img.user-card__avatar-img(:src='avatarSrc')
  .user-card__content
    .user-card__user-name
      span {{username}}
    .user-card__count
      .user-card__count-item.user-card__count-item--watched
        | 看过 &nbsp;
        span {{watchedCount}}
      .user-card__count-item.user-card__count-item--following
        | 关注 &nbsp;
        span {{followingCount}}
      .user-card__count-item.user-card__count-item--follower
        | 粉丝 &nbsp;
        span {{followerCount}}
    .user-card__relation {{relation}}
    el-dropdown.user-card__operations(@command='operationDispature')
      span.el-dropdown-link
        | 操作
        i.el-icon-caret-bottom.el-icon--right
      el-dropdown-menu(slot='dropdown')
        el-dropdown-item(command='follow', v-if='type === "follower"', :disabled='user.relation === "双向关注"')
          | 关注
        el-dropdown-item(command='unfollow', v-if='user.relation === "双向关注" || type === "following"')
          | 取消关注
        el-dropdown-item(command='disable', v-if='type === "follower"', :disabled='user.relation === "双向关注"')
          | 禁止查看

</template>

<style>
.user-card {
  display: inline-block;
  height: 120px;
  width: 410;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

.user-card__avatar {
  float: left;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  overflow: hidden;
}

.user-card__avatar>img {
  width: 100%;
  height: 100%;
}

.user-card__content {
  position: relative;
  float: left;
  margin-left: 24px;
  font-size: 20px;
}

.user-card__user-name {
  font-size: 28px;
  line-height: 48px;
}

.user-card__count {
  padding-bottom: 8px;
  padding-top: 4px;
}

.user-card__count-item {
  display: inline-block;
  width: 80px;
  margin-right: 10px;
  border-right: 1px solid lightgray;
}

.user-card__count-item--watched>span {
  color: #20A0FF;
}

.user-card__count-item--following>span {
  color: #F72AE4;
}

.user-card__count-item--follower>span {
  color: #13CE66;
}

.user-card__count-item--follower {
  border: none;
}

.user-card__operations {
  position: absolute;
  top: 12px;
  right: 24px;
}
</style>

<script>
export default {
  props: ['user', 'type'],
  computed: {
    username() { return this.user.username; },
    watchedCount() { return this.user.watchedCount; },
    followingCount() { return this.user.followingCount; },
    followerCount() { return this.user.followerCount; },
    relation() { return this.user.relation; },
    avatarSrc() { return this.user.avatarSrc; }
  },
  methods: {
    operationDispature(operation) {
      switch (operation) {
        case 'follow':
          this.followUser(this.user.userId)
          break
        case 'unfollow':
          this.unfollowUser(this.user.userId)
          break
        default:
      }
    },
    followUser(id) {
      this.$emit('follow', id);
    },
    unfollowUser(id) {
      this.$emit('unfollow', id);
    },
    goToUser() {
      this.$router.push(`/account/${this.user.userId}`);
    }
  }
}
</script>