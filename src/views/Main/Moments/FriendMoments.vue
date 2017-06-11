<template lang='pug'>
  .moments-page
    moment-list.moments-menu
      router-link(v-for='(moment, index) in moments', key='index', :to='{ name: "MomentSeat", params: { roundId: moment.id.roundId , seatX: moment.id.seatX , seatY: moment.id.seatY} }')
        moment-list-item(:moment='moment' , :friend='friendList[index]')
    router-view.secondary-content
</template>

<script>
import MomentList from '@/components/MomentList'
import MomentListItem from '@/components/MomentListItem'
import {Users , Rounds , FriendMoments} from '@/apis/moment'

export default {
  components: {
    MomentList,
    MomentListItem,
  },
  data () {
    return {
      moments: [],
      friendList: [],
      roundsList: [],
    }
  },
  computed: {
    userId () {
      return (this.$store.getters.currentUser.userId ? this.$stote.getters.currentUser.userId : 1)
    },
  },
  methods: {
    requestMoments: (userId) => {
      return FriendMoments.get({uid: userId})
                    .then((data) => {
                      return {
                        moments: data.body,
                      }
                    })
    },
    requestUser: (momentList) => {
      let promise = Promise.resolve();
      let requestParams = {
        list: momentList,
        pos: 0,
        result: [],
      }
      for (var i = 0; i < momentList.length ; i++) {
        promise = promise.then((users) => {
          if (!users) users = requestParams;
          return Users.get({uid: users.list[users.pos].id.userId})
                      .then((data) => {
                        users.result = users.result.concat(data.body)
                        users.pos += 1
                        return users
                      })
        })
      }
      promise = promise.then((users) => {
          return {
            momentList: users.list,
            userList: users.result,
          }
        })
      return promise
    },
    requestRounds: (momentsList) => {
      let promise = Promise.resolve;
      let requestObject = {
        list: momentsList,
        pos: 0,
        result: [],
      };
      for (var i = 0 ; i < momentsList.length ; i++) {
        promise = promise.then((rounds) => {
          if (!rounds) rounds = requestObject;
          return Rounds.get()
                       .then((data) => {
                         rounds.result = rounds.result.push(data.body);
                         rounds.pos += 1;
                         return rounds;
                       })
        })
      }
      promise = promise.then((rounds) => {
        return {
          roundsList: rounds.result,
        }
      })
      return promise;
    },
  },
  created () {
    let self = this;
    let userId = self.userId;

    self.requestMoments(userId)
        .then((data) => {
          return self.requestUser(data.moments);
        })
        .then((data) => {
          self.moments = data.momentList;
          self.friendList = data.userList;
        })

  },
}
</script>

<style>
.moments-page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}

.moments-menu {
  flex: none;
  width: 20rem;
}
</style>
