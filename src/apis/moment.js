import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  const store = require('@/store').default
  if (store.state.accessToken) {
    request.headers.set('Authorization', store.state.accessToken)
  }
  next()
})


export const Moments = Vue.resource('/api/moments{/uid}');
export const Watches = Vue.resource('/api/watches{/user_id}');
export const FriendFrom = Vue.resource('/api/user_rels{/from_id}');
export const FriendTo = Vue.resource('/api/user_rels{/to_id}');
export const FriendRound = Vue.resource('/api/rounds{/rid}');

// export const MomentCinema = Vue.resource('/api/cinemas{/cid}');
// export const MomentRound = Vue.resource('/api/rounds{/rid}');
