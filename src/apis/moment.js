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

// Here we put a resourse
// export const Moments = Vue.resource('/api/users{/uid}/following/moments');
// export const Moments = Vue.resource('/api/users{/uid}/moments');
export const Moments = Vue.resource('/api/moments{/uid}');
export const Users = Vue.resource('/api/users{/uid}');
// export const Rounds = Vue.resource('/api/rounds{/rid}');
export const Rounds = Vue.resource('/api/round{/rid}');
// export const MomentCinema = Vue.resource('/api/cinemas{/cid}');
// export const MomentRound = Vue.resource('/api/rounds{/rid}');
