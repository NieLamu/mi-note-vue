<template>
  <ion-app>
    <ion-header translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <router-link tag="ion-button" to="/" color="primary">
            <ion-icon name="ios-arrow-back"></ion-icon>首页
          </router-link>
        </ion-buttons>
        <ion-title>TODO</ion-title>
        <ion-buttons slot="end">
          <router-link tag="ion-button" to="/about" color="primary">
            拍照
            <ion-icon name="ios-arrow-forward"></ion-icon>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
      <ion-list>
        <ion-item v-for="todo in todos" :key="todo.id">
          <ion-label>{{ todo.name }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed" @click="addTodo">
        <ion-fab-button>
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-app>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      todos: []
    }
  },
  methods: {
    addTodo () {
      this.$router.push({ path: '/todos/add' })
    }
  },
  created () {
    axios
      .get('http://192.168.102:3001/todos')
      .then(res => {
        console.log('res', res)
        this.todos = res.data
      })
  }
}
</script>

<style scoped>
</style>
