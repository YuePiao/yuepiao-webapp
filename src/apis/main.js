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

export const User = Vue.resource('/api/users{/id}', {}, {
  signin: {
    method: 'POST',
    url: '/api/login/',
  },
  signup: {
    method: 'POST',
    url: '/api/users/signup',
  },
  signout: {
    method: 'POST',
    url: '/api/users/signout',
  },
  following: {
    method: 'GET',
    url: '/api/users{/id}/following',
  },
})

export const Movies = Vue.resource('/api/movies{/mid}')

export const Cinemas = Vue.resource('/api/movies{/mid}/cinemas{/cid}', {}, {
  rounds: {
    method: 'GET',
    url: '/api/movies{/mid}/cinemas{/cid}/rounds',
  },
})

export const Rounds = Vue.resource('/api/rounds{/rid}', {}, {
  meta: {
    methods: 'GET',
    url: '/api/rounds{/rid}/meta',
  },
})
