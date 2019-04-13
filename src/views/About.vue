<template>
  <ion-app>
    <ion-header translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <router-link tag="ion-button" to="/todos" color="primary">
            <ion-icon name="ios-arrow-back"></ion-icon>TODO
          </router-link>
        </ion-buttons>
        <ion-title>拍照</ion-title>
        <ion-buttons slot="end" class="title-btn-hide">
          <router-link tag="ion-button" to color="primary">
            拍啥
            <ion-icon name="ios-arrow-forward"></ion-icon>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <img id="myImage" style="height:100%;width:100%;">
    </ion-content>
    <!-- fab placed in the center of the content with a list on each side -->
    <ion-fab vertical="bottom" horizontal="center" slot="fixed">
      <ion-fab-button @click="getPicture">
        <ion-icon name="camera"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-app>
</template>

<script>
export default {
  name: 'About',
  mounted () {
    console.log(navigator, window)
  },
  methods: {
    getPicture: function () {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      })

      function onSuccess (imageURI) {
        var image = document.getElementById('myImage')
        image.src = imageURI
      }

      function onFail (message) {
        alert('Failed because: ' + message)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
