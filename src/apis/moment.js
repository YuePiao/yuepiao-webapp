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
export const SelfMoments = Vue.resource('/api/users{/uid}/moments');
export const FriendMoments = Vue.resource('/api/users{/uid}/following/moments');
export const Users = Vue.resource('/api/users{/uid}');
export const Rounds = Vue.resource('/api/rounds{/rid}', {}, {
  meta: {
    methods: 'GET',
    url: '/api/rounds{/rid}/meta',
  },
})
export const Movies = Vue.resource('/api/movies{/mid}')
export const Cinemas = Vue.resource('/api/movies{/mid}/cinemas{/cid}')
