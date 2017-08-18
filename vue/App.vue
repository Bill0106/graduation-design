<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar'

export default {
  name: 'app',
  components: {
    'Navbar': Navbar
  }
}
</script>
