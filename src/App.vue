<template>
  <!-- Main Framework7 App component where we pass Framework7 params -->
  <f7-app :params="f7params">
    <f7-statusbar></f7-statusbar>
    <!-- initial page is specified in routes.js -->
    <f7-view main url="/"></f7-view>
  </f7-app>
</template>

<script>
import f7params from './f7params'

export default {
  data () {
    return {
      // app params
      f7params
    }
  },
  mounted () {
    this.$f7ready((f7) => {
      console.log('s', f7)
      f7.dialog.alert('Component mounted')
    })
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
