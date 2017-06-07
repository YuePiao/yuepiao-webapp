import Vue from 'vue'
import Router from 'vue-router'

import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import Main from '@/views/Main/Main'

import Account from '@/views/Main/Account/Account'
import Moments from '@/views/Main/Moments/Moments'
import Movies from '@/views/Main/Movies/Movies'
import Cinemas from '@/views/Main/Movies/Cinemas'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: 'account',
      name: 'Account',
      component: Account,
    }, {
      path: 'moments',
      name: 'Moments',
      component: Moments,
    }, {
      path: 'movies',
      name: 'Movies',
      component: Movies,
      children: [{
        path: ':movieId/cinemas',
        name: 'Cinemas',
        component: Cinemas,
        children: [{
          path: ':cinemaId/rounds',
          name: 'Rounds',
        }],
      }],
    }],
  }, {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  }, {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  }],
})
