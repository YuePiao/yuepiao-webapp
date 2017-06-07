<template lang='pug'>
.user-card
  .user-card__avatar
    img.user-card__avatar-img(:src='avatarSrc')
  .user-card__content
    .user-card__user-name
    .user-card__count
      .user-card__count-item.user-card__count-item--watched
        | 看过
        span {{watchedCount}}
      .user-card__count-item.user-card__count-item--follower
        | 关注
        span {{followingCount}}
      .user-card__count-item.user-card__count-item--following
        | 粉丝
        span {{followerCount}}
    .user-card__relation {{relation}}
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
      _username: '用户名',
      _watchedCount: 12,
      _followCount: 23,
      _fansCount: 45,
      _relation: '单向关注',
      _avatarSrc: 'https://dummyimage.com/120x120.jpg?text=avatar',
      _operationList: []
    }
  },
  computed: {
    username() { return this._username; },
    watchedCount() { return this._watchedCount; },
    followingCount() { return this._followCount; },
    followerCount() { return this._fansCount; },
    relation() { return this._relation; },
    avatarSrc() { return this._avatarSrc; },
    operationList() { return this._operationList; }
  },
  methods: {
    operationDispature(operation) {
      switch (operation) {
        case 'nothing':
          'hehe'
          break
      }
    }
  }
}
</script>