<template lang='pug'>
  .signup-page
    el-col.signup-form-wrapper(:xs='22', :sm='16', :md='12', :lg='10')
      el-form.signup-form
        el-form-item
          el-input(placeholder='Username or E-mail', v-model='username')
        el-form-item
          el-input(type='password', placeholder='Password', v-model='password')
        el-form-item
          el-input(type='password', placeholder='Repeat Password', v-model='rpassword')
        el-form-item.signup-btn-wrapper
          el-button.signup-btn(nativeType='submit', type='primary', @click.prevent='OnSubmit') signup
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      rpassword: '',
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
      this.signup({
        username: this.username,
        password: this.password,
      })
      .then(() => {
        this.$router.push({ name: 'Login' })
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
      'signup',
      'readFromStorage',
    ]),
  },
}
</script>

<style scoped>

.signup-page {
  height: 100%;
  width: 100%;
  position: relative;
}

.signup-form-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.signup-form {
  background: #e0e6ed;
  padding: 2rem;
  border-radius: 10px;
}

.signup-btn-wrapper {
  margin: 0;
}

.signup-btn {
  width: 100%;
}

.background {
  background: #2e90fe;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

</style>
