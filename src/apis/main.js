import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  const store = require('@/store').default
  if (store.state.accessToken) {
    request.headers.set('Authorization', store.state.accessToken.id)
  }
  next()
})

export const User = Vue.resource('/api/users{/id}', {}, {
  signin: {
    method: 'POST',
    url: '/api/users/signin',
  },
  signup: {
    method: 'POST',
    url: '/api/users/signup',
  },
  signout: {
    method: 'POST',
    url: '/api/users/signout',
  },
})

export const Movies = Vue.resource('/api/movies{/mid}')

export const Cinemas = Vue.resource('/api/movies{/mid}/cinemas{/cid}')
