<template>
  <div v-if="!isAdmin">
    <navbar :user="user"></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
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
      return name.indexOf('admin') === 0
    }
  },
  beforeMount() {
    services.checkUser()
      .then(res => {
        const { data } = res
        if (data.status === 'success') {
          this.user = data.data.user
        }
      })
    console.log(this.$route.name)
  }
}
</script>
