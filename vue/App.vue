<template>
  <div>
    <navbar v-if="!isAdmin" :user="user" ></navbar>
    <div class="container" v-if="!isAdmin">
      <router-view></router-view>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import services from './services'
import Navbar from './components/navbar'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  },
  data() {
    return {
      user: null
    }
  },
  computed: {
    isAdmin() {
      const name = this.$route.name
      return name.startsWith('admin')
    }
  },
  async beforeMount() {
    const checkUser = await services.checkUser()
    const { data } = checkUser
    if (data.status === 'success') {
      this.user = data.data.user
    }
  }
}
</script>
