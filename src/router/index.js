import Vue from 'vue'
import Router from 'vue-router'

import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import Main from '@/views/Main/Main'

import Account from '@/views/Main/Account/Account'
import Moments from '@/views/Main/Moments/Moments'
import Movies from '@/views/Main/Movies/Movies'
import Cinemas from '@/views/Main/Movies/Cinemas'
import Seats from '@/views/Main/Movies/Seats'
import MomentSeats from '@/views/Main/Moments/MomentSeat'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [
    {
      path: 'account/:userId?',
      name: 'Account',
      component: Account,
    }, {
      path: 'moments',
      name: 'Moments',
      component: Moments,
      children: [{
        path: 'select-seat/:roundId/friend/:seatX/:seatY',
        name: 'MomentSeats',
        component: MomentSeats,
      }]
    }, {
      path: 'movies',
      name: 'Movies',
      component: Movies,
      children: [{
        path: 'cinema-list/:movieId',
        name: 'Cinemas',
        component: Cinemas,
        children: [{
          path: 'round-list/:cinemaId',
          name: 'Rounds',
        }],
      }, {
        path: 'select-seat/:roundId',
        name: 'Seats',
        component: Seats,
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
