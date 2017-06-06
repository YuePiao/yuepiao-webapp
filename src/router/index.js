import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import Main from '@/views/Main/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    }, {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
})
