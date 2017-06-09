<template lang='pug'>
  .moments-page
    moment-list.moments-menu
      router-link(v-for='(friend, index) in friendList', key='index', :to='{ name: "MomentSeats", params: { roundId: moments[index].id.roundId , seatX: moments[index].id.seatX , seatY: moments[index].id.seatY} }')
        moment-list-item(:moment='moments[index]' , :friend='friend')
    router-view.secondary-content
</template>

<script>
import MomentList from '@/components/MomentList'
import MomentListItem from '@/components/MomentListItem'
// import store from '@/store'
import {Moments , Users , Rounds} from '@/apis/moment'
// import Unique from '@/util/unique'

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
  methods: {
    requestMoments: () => {
    // requestMoments: (userId) => {
      // return Moments.get({uid: userId})
      return Moments.get()
                    .then((data) => {
                      return {
                        moments: data.body,
                      }
                    })
    },
    requestUsers: (momentsList) => {
      let promise = Promise.resolve();
      let requireObject = {
        list: momentsList,
        pos: 0,
        result: [],
      };
      for (var i = 0 ; i < momentsList.length ; i++) {
        promise = promise.then((users) => {
          if (!users) users = requireObject;
          return Users.get()
          // return Users.get({uid: users.list[users.pos].id.userId})
                      .then((data) => {
                        users.result = users.result.concat(data.body);
                        users.pos += 1;
                        return users;
                      })
        })
      }
      promise = promise.then((users) => {
        return {
          userList: users.result,
        }
      })
      return promise;
    },
    requestRounds: (momentsList) => {
      let promise = Promise.resolve;
      let requestObject = {
        list: momentsList,
        pos: 0,
        result: [],
      };
      for (var i = 0 ; i < momentsList.length() ; i++) {
        promise = promise.then((rounds) => {
          if (!rounds) rounds = requestObject;
          // return Rounds.get({uid: rounds.list[rounds.pos].id.roundId})
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
    // console.log(self.$store.getters.currentUser.username);
    /**
     * TODO: get user id by username
     */
     let userId = self.$store.getters.currentUser.username;


    self.requestMoments(userId)
        .then((data) => {
          self.moments = data.moments;
          return self.requestUsers(data.moments);
        })
        .then((data) => {
          self.friendList = data.userList;
        })
    // self.requestFromFriend()
    //     .then((data) => {
    //       return this.requestToFriend(data);
    //     })
    //     .then((data) => {
    //       return this.requestWatches(data)
    //     })
    //     .then((result) => {
    //       this.friendsList = result.friendsList;
    //       this.watchList = result.watchList;
    //       return this.requestRounds(result.watchList);
    //     })
    //     .then((result) => {
    //       this.roundsList = result.roundList;

    //       // Handle the moments
    //       let momentum = [];
    //       for (var i = 0 ; i < result.roundList.length ; i++) {
    //         let tempData = {};
    //         tempData.user = {
    //           avatar: '',
    //           username: this.friendsList[i],
    //         };
    //         tempData.round = result.roundList[i];
    //         tempData.seat = {
    //           x: this.watchList[i].seat_x,
    //           y: this.watchList[i].seat_y,
    //         }
    //         momentum.push(tempData);
    //       }
    //       this.moments = momentum;
    //     })

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
