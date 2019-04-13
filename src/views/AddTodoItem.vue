<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Item</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-input :value="name" ref="newTodoItem" @input="updateTodoName" placeholder="Todo Name"></ion-input>
      </ion-item>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addTodo">
          <ion-icon name="checkmark"></ion-icon>
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
      name: ''
    }
  },
  methods: {
    addTodo () {
      const newTodo = { name: this.name }
      axios.post('http://192.168.1.102:3001/todos', newTodo).then(res => {
        this.$router.push({ path: '/todos' })
      })
    },
    updateTodoName () {
      this.name = this.$refs.newTodoItem.value
    }
  }
}
</script>
