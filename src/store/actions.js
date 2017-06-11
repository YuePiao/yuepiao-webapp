import { User } from '@/apis/main'
import * as storage from './storage'

export function signin ({ commit, dispatch }, user) {
  return User.signin({
    username: user.username,
    password: user.password,
  })
  .then(({ body: { digest: accessToken, userView: currentUser } }) => {
    commit('UPDATE_ACCESS_TOKEN', accessToken)
    commit('UPDATE_CURRENT_USER', currentUser)
  })
}

export function signup ({ commit, dispatch }, user) {
  return User.signup({
    username: user.username,
    password: user.password,
  })
}

export function signout ({ commit }) {
  return User.signout()
  .then(() => {
    commit('REMOVE_ACCESS_TOKEN')
    commit('REMOVE_CURRENT_USER')
  })
}

export function saveToStorage ({ state }, toSession) {
  storage.set('accessToken', state.accessToken, toSession)
  storage.set('currentUser', state.currentUser, toSession)
}

export function readFromStorage ({ commit }) {
  const accessToken = storage.get('accessToken')
  const currentUser = storage.get('currentUser')
  if (accessToken && currentUser) {
    commit('UPDATE_ACCESS_TOKEN', accessToken)
    commit('UPDATE_CURRENT_USER', currentUser)
  } else {
    commit('REMOVE_ACCESS_TOKEN')
    commit('REMOVE_CURRENT_USER')
  }
  return Promise.resolve({ accessToken, currentUser })
}
