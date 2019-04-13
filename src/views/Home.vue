<template>
  <ion-app>
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <router-link to="/todos">Todos</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </ion-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
