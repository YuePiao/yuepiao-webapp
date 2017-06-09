<template lang='pug'>
  .moments-page
    moment-list.moments-menu
      router-link(v-for='(moment, index) in moments', key='index', :to='{ name: "MomentSeats", params: { roundId: moment.round.id , seatX: moment.seat.x , seatY: moment.seat.y} }')
        moment-list-item(:moment='moment')
    router-view.secondary-content
</template>

<script>
import MomentList from '@/components/MomentList'
import MomentListItem from '@/components/MomentListItem'
// import store from '@/store'
import {Watches , FriendFrom , FriendTo , FriendRound} from '@/apis/moment'
import Unique from '@/util/unique'

export default {
  components: {
    MomentList,
    MomentListItem,
  },
  data () {
    return {
      moments: [],
      friendList: [],
      watchesList: [],
      roundsList: [],
    }
  },
  methods: {
    requestFromFriend: () => {
      return FriendFrom.get()
        .then((data) => {
          let thisList = []
          thisList = data.body.map((rel) => {
            return rel.to_id
          })
          let returnForm = {
            friendList: thisList,
          }
          return returnForm;
      })
    },
    requestToFriend: (returnForm) => {
      let nextList = returnForm.friendList
      return FriendTo.get()
      .then((data) => {
        nextList.concat(data.body.map((rel) => {
          return rel.from_id
        }));
        return nextList;
      })
    },
    requestWatches: (friendsList) => {
      // console.log(friendsList);
      let requireObject = {
        list: friendsList,
        pos: 0,
        result: [],
      };
      let promise = Promise.resolve();
      for (var i = 0 ; i < friendsList.length ; i++) {
        promise = promise.then((friends) => {
          if (!friends) friends = requireObject;
          return Watches.get()
                .then((data) => {
                  friends.result = friends.result.concat(data.body);
                  friends.pos += 1;
                  return friends;
                })
          })
      }
      promise = promise.then((watches) => {
        let result = {
          friendsList: friendsList,
          watchList: Unique(watches.result),
        };
        return result;
      })
      return promise;
    },
    requestRounds: (roundList) => {
      let requestObject = {
        list: roundList,
        pos: 0,
        result: []
      };
      let promise = Promise.resolve();
      for (var i = 0 ; i < roundList.length ; i++) {
        promise = promise.then((rounds) => {
          if (!rounds) rounds = requestObject;
          return FriendRound.get()
                .then((data) => {
                  rounds.result = rounds.result.concat(data.body);
                  rounds.pos += 1;
                  return rounds;
                })
        })
      }
      promise = promise.then((rounds) => {
        let result = {
          roundList: rounds.result,
        }
        return result;
      })
      return promise;
    },
  },
  created () {
    let self = this;
    self.requestFromFriend()
        .then((data) => {
          return this.requestToFriend(data);
        })
        .then((data) => {
          return this.requestWatches(data)
        })
        .then((result) => {
          this.friendsList = result.friendsList;
          this.watchList = result.watchList;
          return this.requestRounds(result.watchList);
        })
        .then((result) => {
          this.roundsList = result.roundList;

          // Handle the moments
          let momentum = [];
          for (var i = 0 ; i < result.roundList.length ; i++) {
            let tempData = {};
            tempData.user = {
              avatar: '',
              username: this.friendsList[i],
            };
            tempData.round = result.roundList[i];
            tempData.seat = {
              x: this.watchList[i].seat_x,
              y: this.watchList[i].seat_y,
            }
            momentum.push(tempData);
          }
          this.moments = momentum;
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
