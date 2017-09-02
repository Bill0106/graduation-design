<template>
  <div v-if="!isAdmin">
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/navbar'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  },
  computed: {
    isAdmin() {
      const name = this.$route.name
      return name && name.startsWith('admin')
    }
  }
}
</script>
