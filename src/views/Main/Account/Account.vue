<template lang='pug'>
.p-account
  .p-account__user-info
    .p-account__avatar
      img(:src='avatar')
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
    el-table(v-if='state === "payment"', :data='watchedList')
      el-table-column(prop='movie', label='电影')
      el-table-column(prop='cinema', label='影院')
      el-table-column(prop='place', label='场次')
      el-table-column(prop='price', label='金额')
    .p-account__follower-list(v-if='state === "follower"')
      user-card(v-for='user in followerList', :user='user', @click='checkUser(user.id)', type='follower', @follow='follow')
    .p-account__follower-list(v-if='state === "following"')
      user-card(v-for='user in followingList', :user='user', @click='checkUser(user.id)', type='following', @unfollow='unfollow')


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
import { Observable } from 'rxjs'
function generateUserSteam(type) {
  return Observable.fromPromise(this.$http.get(`/api/users/${this.$route.params.userId}/${type}`))
    .pluck('body')
    .concatMap(list => Observable.from(list))
    .map(id => Observable.combineLatest([
      Observable.fromPromise(this.$http.get(`/api/users/${id}`)).pluck('body'),
      Observable.fromPromise(this.$http.get(`/api/users/${id}/moments`)).pluck('body','length'),
      Observable.fromPromise(this.$http.get(`/api/users/${id}/following`)).pluck('body','length'),
      Observable.fromPromise(this.$http.get(`/api/users/${id}/followers`)).pluck('body','length')
      ])
      .map(user => {
        return {
          username: user[0].username,
          avatarSrc: user[0].avatar || 'https://dummyimage.com/120x120.jpg?text=avatar',
          userId: user[0].userId,
          watchedCount: user[1],
          followingCount: user[2],
          followerCount: user[3],
          relation: '单向关注'
        }
      })
    )
    .combineAll();
}
export default {
  components: {
    UserCard
  },
  data() {
    return {
      state: 'payment',
      avatar: 'https://dummyimage.com/120x120.jpg?text=avatar',
      username: '用户名',
      followerList: [],
      followingList: [],
      watchedList: []
    }
  },
  watch: {
    userId(newVal, oldVal) {
      if(newVal === oldVal) return;
      this.fetchData();
    }
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    followingCount() {
      return this.followingList.length;
    },
    followerCount() {
      return this.followerList.length;
    },
    watchedCount() {
      return this.watchedList.length;
    },
    paymentCount() {
      return this.watchedList.length;
    }
  },
  mounted() {
    if (!this.$route.params.userId) {
        this.$router.replace('/account/' + ((this.$store.state.currentUser && this.$store.state.currentUser.userId)|| 1))
    }
    this.fetchData();
  },
  methods: {
    fetchData() {

      let following = generateUserSteam.call(this, 'following')
      let followers = generateUserSteam.call(this, 'followers')

      Observable.combineLatest(following, followers)
      .subscribe((users) => {
        console.log(users)
        let followingList = users[0]
        let followersList = users[1]

        followersList.forEach(follower => {
          let match = followingList.find(item => item.userId === follower.userId)
          if(match) {
            follower.relation = match.relation = '双向关注'
          }
        })

        this.followerList = followersList
        this.followingList = followingList
      })

      this.$http.get(`/api/users/${this.$route.params.userId}`).then(({body: user}) => {
        this.avatarSrc = user.avatar || 'https://dummyimage.com/120x120.jpg?text=avatar'
        this.username = user.username
      })
      
      this.$http.get(`/api/users/${this.$route.params.userId}/moments`).then(({body:moments}) => {
        this.watchedList = moments
      })

    },
    onWatchedClick() {
      this.$router.push(`/moments/${this.$route.params.userId}`);
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
    },
    follow(id) {
      this.$http.post(`/api/users/${this.$store.state.currentUser.userId}/followers`, id)
    },
    unfollow(id) {
      this.$http.delete(`/api/users/${this.$store.state.currentUser.userId}/followers/${id}`)
    }
  }
}
</script>