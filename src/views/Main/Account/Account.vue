<template lang='pug'>
.p-account
  .p-account__user-info
    .p-account__avatar
      img(:src='userAvatar')
      .p-account__username {{username}}
    .p-account__count
      .p-account__count-item.counter(@click='onWatchedClick()')
        .counter__title
          | 看过
        .counter__number.counter__number--watched {{watchedCount}}
      .p-account__count-item.counter(@click='onFollowingClick()')
        .counter__title
          | 关注
        .counter__number.counter__number--following {{followingCount}}
      .p-account__count-item.counter(@click='onFollowerClick()')
        .counter__title
          | 粉丝
        .counter__number.counter__number--follower {{followerCount}}
      .p-account__count-item.counter(@click='onPaymentClick()')
        .counter__title
          | 订单
        .counter__number.counter__number--payment {{paymentCount}}
  .p-account__content
    el-table(v-if='state === "payment"', :data='payments')
      el-table-column(prop='id', label='订单号')
      el-table-column(prop='state', label='状态')
      el-table-column(prop='movie', label='电影')
      el-table-column(prop='cinema', label='影院')
      el-table-column(prop='roundId', label='场次号')
      el-table-column(prop='payment', label='金额')
    .p-account__follower-list(v-if='state === "follower"')
      user-card(v-for='user in followerList', :user='user', @click='checkUser(user.id)', type='follower')
    .p-account__follower-list(v-if='state === "following"')
      user-card(v-for='user in followingList', :user='user', @click='checkUser(user.id)', type='following')


</template>

<style>
.p-account {
  padding: 24px;
  font-family: Arial, Helvetica, sans-serif;
  color: #686868;
}

.p-account__user-info {
  height: 236px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 32px;
  width: 1400px;
}

.p-account__content {
  margin: 0 24px;
}

.p-account__count {
  float: left;
}

.p-account__avatar {
  float: left;
}

.p-account__avatar>img {
  height: 180px;
  width: 180px;
  border-radius: 50%;
}

.p-account__username {
  font-size: 36px;
  text-align: center;
  margin-top: 8px;
}

.counter {
  display: inline-block;
  border-right: 2px solid lightgray;
  width: 280px;
  cursor: pointer;
}

.counter__title {
  font-size: 48px;
  text-align: right;
}

.counter__number {
  font-size: 160px;
  text-align: right;
}

.counter__number--watched {
  color: #20A0FF;
}

.counter__number--following {
  color: #F72AE4;
}

.counter__number--follower {
  color: #13CE66;
}

.counter__number--payment {
  color: #F7BA2A;
}
</style>

<script>
import UserCard from '@/components/UserCard/UserCard.vue'
export default {
  components: {
    UserCard
  },
  data() {
    return {
      state: 'payment',
      userAvatar: 'https://dummyimage.com/120x120.jpg?text=avatar',
      username: '用户名',
      watchedCount: 12,
      followerCount: 23,
      followingCount: 45,
      paymentCount: 12,
      followerList: [],
      followingList: [],
      user: {
        username: '用户名',
        followerCount: 12,
        followingCount: 23,
        watchedCount: 2,
        relation: '单向关注',
        avatarSrc: 'https://dummyimage.com/120x120.jpg?text=avatar'
      }
    }
  },
  methods: {
    onWatchedClick() {
      this.$router.push({ name: 'moment', params: {} });
    },
    onFollowingClick() {
      if (this.state === 'following') return;
      this.state = 'following'
    },
    onFollowerClick() {
      if (this.state === 'follower') return;
      this.state = 'follower'
    },
    onPaymentClick() {
      if (this.state === 'payment') return;
      this.state = 'payment'
    }
  }
}
</script>