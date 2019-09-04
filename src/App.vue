<template>
  <!-- Main Framework7 App component where we pass Framework7 params -->
  <f7-app :params="f7Params">
    <f7-statusbar></f7-statusbar>
    <!-- initial page is specified in routes.js -->
    <f7-view
      url="/"
      :main="true"
      class="safe-areas"
      :master-detail-breakpoint="800"
      :class="$store.state.hideNavbar"
    ></f7-view>
  </f7-app>
</template>

<script>
import routes from './routes'

export default {
  data () {
    let view = {
    }
    if (!window.cordova) {
      view = {
        main: true,
        pushState: true
      }
    }
    console.log('data', window.cordova)
    return {
      f7Params: {
        name: 'MI NOTE',
        id: 'io.github.NieLamu',
        routes,
        view,
        popup: {
          closeOnEscape: true
        },
        sheet: {
          closeOnEscape: true
        },
        popover: {
          closeOnEscape: true
        },
        actions: {
          closeOnEscape: true
        }
      }
    }
  },
  methods: {
    listenDeviceEvent: function () {
      document.addEventListener('pause', onPause, false)
      document.addEventListener('resume', onResume, false)
      document.addEventListener('menubutton', onMenuKeyDown, false)
      document.addEventListener('backbutton', onBackKeyDown, false)
      window.addEventListener('keyboardDidShow', function () {
        console.log('keyboardDidShow')

        // Describe your logic which will be run each time keyboard is shown.
      })
      window.addEventListener('keyboardDidHide', function () {
        console.log('keyboardDidHide')

        // Describe your logic which will be run each time keyboard is shown.
      })
      // Add similar listeners for other events

      function onPause () {
        // Handle the pause event
        console.log('app onPause')
      }
      function onResume () {
        // Handle the resume event
        console.log('app onResume')
      }
      function onMenuKeyDown () {
        // Handle the menubutton event
        console.log('app onMenuKeyDown')
      }
      function onBackKeyDown (e) {
        console.log('onBackKeyDown', window.location)

        // Use Framework7's router to navigate back
        var mainView = window.app.views.main

        var leftp = window.app.panel.left && window.app.panel.left.opened
        var rightp = window.app.panel.right && window.app.panel.right.opened

        if (leftp || rightp) {
          console.log('onBackKeyDown panel', leftp, rightp)
          window.app.panel.close()
          // return false
        } else if (window.$$('.modal-in').length > 0) {
          console.log('onBackKeyDown modal')
          window.app.dialog.close()
          window.app.popup.close()
          window.app.popover.close()
          window.app.actions.close()
          // return false
        } else if (window.app.views.main.router.url === '/') {
          console.log('onBackKeyDown exitApp')
          navigator.app.exitApp()
        } else {
          console.log('onBackKeyDown back')
          mainView.router.back()
        }
      }
    },
    setColors: function () {
      const mainBgColor = '#f0c023'// '#63bbd0' '#00bcd4' '#f0c023'
      const mainColor = '#f0c023'
      const statusBarOpacity = 'ff'
      const platform = document.querySelector('.md') || document.querySelector('.ios')
      platform.setAttribute('style', `--f7-page-bg-color: ${mainBgColor} !important`)
      document.querySelector("meta[name='theme-color']").setAttribute('content', `${mainBgColor}`)
      document.querySelector(':root').style.setProperty('--main-bg-color', `${mainBgColor}`)
      document.querySelector(':root').style.setProperty('--main-color', ` ${mainColor}`)

      if (!!window.cordova && !!window.StatusBar && window.cordova.platformId === 'android') {
      // window.StatusBar.overlaysWebView(true)
        window.StatusBar.backgroundColorByHexString(`#${statusBarOpacity}${mainBgColor.split('#')[1]}`)
      }
    }
  },
  mounted () {
    const app = this.$f7
    const $$ = this.$$
    window.app = app
    window.$$ = $$
    console.log('mounted. app, cordova:', app, window.cordova)
    this.setColors()
    this.listenDeviceEvent()

    const notes = this.$db.get('notes').value() || {}
    this.$store.commit('setAllNotes', notes)

    // dialosg test
    app.dialog.progress()
    setTimeout(function () {
      app.dialog.close()
    }, 1000)
  }
}
</script>

<style lang="less">
// ionicons
@import "~ionicons/css/ionicons.min.css";
@import "assets/fontello/css/fontello.css";

:root {
  --nav-move-height: calc(var(--f7-navbar-height) * -1);
  --f7-card-border-radius: 0.625rem !important;
  --f7-searchbar-in-page-content-input-border-radius: 0.625rem !important;
  --f7-searchbar-input-border-radius: 0.625rem !important;
  --f7-theme-color: black !important;
  --f7-fab-pressed-bg-color: var(--main-color);
}

.md {
  --f7-searchbar-in-page-content-margin: 0rem !important;
  --f7-popover-box-shadow: 0 0 0 !important;
  --f7-searchbar-in-page-content-border-radius: 0 !important;
  --f7-searchbar-in-page-content-box-shadow: 0 0 0 !important;
  --f7-searchbar-input-padding-horizontal: 2.1875rem !important;
  --f7-fab-box-shadow: 0 0 0 !important;
  --f7-fab-size: 3rem !important;
  --f7-actions-button-text-align: center !important;
  .searchbar {
    --f7-searchbar-input-extra-padding-left: 0rem !important;
  }
  .navbar:before,
  .toolbar-bottom:before,
  .toolbar-bottom:after {
    height: 0;
  }
  .navbar .link {
    padding: 0 0.9375rem;
  }
  .list .item-media {
    min-width: 0rem !important;
  }
}
.ios {
  --f7-fab-box-shadow: 0 0 0 !important;
  .navbar:after,
  .toolbar-bottom:before,
  .toolbar-bottom:after {
    height: 0;
  }
  .navbar .link {
    padding: 0 0.3125rem;
  }
}

:focus {
  outline-width: 0rem;
}

.main-color {
  color: var(--main-color);
}

i {
  font-size: 1.75rem;
}

.navbar,
.subnavbar {
  background-color: var(--main-bg-color) !important;
  a {
    color: black !important;
  }
}

a {
  padding: 0 !important;
}
// hide navbar
.view-top {
  top: var(--nav-move-height) !important;
}
.view-height {
  height: calc(100% - var(--nav-move-height)) !important;
}
.view {
  top: 0;
  transition: top 0.3s ease;
}

// must put here then work
.searchbar {
  --f7-searchbar-input-font-size: 0.875rem;
}
.searchbar-inner {
  overflow: hidden;
  .searchbar-input-wrap {
    overflow: hidden;
  }
}

// must put here then work
.add-new-folder {
  .item-inner {
    justify-content: center !important;
    text-align: center;
    i {
      font-size: 1.625rem;
    }
  }
}

html {
  font-size: 16px;
}
</style>
