<template lang='pug'>
  .login-page
    el-col.login-form-wrapper(:xs='22', :sm='16', :md='12', :lg='10')
      el-form.login-form
        el-form-item
          el-input(placeholder='Username or E-mail', v-model='username')
        el-form-item
          el-input(type='password', placeholder='Password', v-model='password')
        el-form-item.login-btn-wrapper
          el-button.login-btn(nativeType='submit', type='primary', @click.prevent='OnSubmit') Login
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },
  created () {
    this.readFromStorage()
      .then(({ accessToken, currentUser }) => {
        if (accessToken && currentUser) {
          // TODO check login
          this.$router.push({ name: 'Main' })
        }
      })
  },
  methods: {
    OnSubmit () {
      this.login({
        username: this.username,
        password: this.password,
      })
      .then(() => {
        this.saveToStorage(true) // save to sessionStorage
        this.$router.push({ name: 'Main' })
      })
      .catch(err => {
        err = err ? (err.message || (err.body && err.body.error && err.body.error.message)) : 'Error'
        this.$message({
          message: err,
          type: 'error',
        })
      })
    },
    ...mapActions([
      'login',
      'saveToStorage',
      'readFromStorage',
    ]),
  },
}
</script>

<style scoped>
.login-page {
  height: 100%;
  width: 100%;
  position: relative;
}

.login-form-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-form {
  background: #e0e6ed;
  padding: 2rem;
  border-radius: 10px;
}

.login-btn-wrapper {
  margin: 0;
}

.login-btn {
  width: 100%;
}

.background {
  background: #2e90fe;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

</style>

