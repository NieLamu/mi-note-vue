<template>
  <!-- Main Framework7 App component where we pass Framework7 params -->
  <f7-app :params="f7Params">
    <f7-statusbar></f7-statusbar>
    <!-- initial page is specified in routes.js -->
    <f7-view url="/" :master-detail-breakpoint="800"></f7-view>
  </f7-app>
</template>

<script>
import routes from './routes'
import { mapGetters } from 'vuex'

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
    return {
      f7Params: {
        name: 'MI NOTE',
        id: 'io.github.NieLamu',
        theme: 'ios',
        mainBgColor: '#efeff4',
        mainColor: '#f0c023',
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
        console.log('————app keyboardDidShow')

        // Describe your logic which will be run each time keyboard is shown.
      })
      window.addEventListener('keyboardDidHide', function () {
        console.log('————app keyboardDidHide')

        // Describe your logic which will be run each time keyboard is shown.
      })
      // Add similar listeners for other events

      function onPause () {
        // Handle the pause event
        console.log('————app onPause')
      }
      function onResume () {
        // Handle the resume event
        console.log('————app onResume')
      }
      function onMenuKeyDown () {
        // Handle the menubutton event
        console.log('————app onMenuKeyDown')
      }
      function onBackKeyDown (e) {
        console.log('————app onBackKeyDown', window.location)

        // Use Framework7's router to navigate back
        var mainView = window.app.views.main

        var leftp = window.app.panel.left && window.app.panel.left.opened
        var rightp = window.app.panel.right && window.app.panel.right.opened

        if (leftp || rightp) {
          console.log('————app onBackKeyDown panel hide', leftp, rightp)
          window.app.panel.close()
          // return false
        } else if (window.$$('.modal-in').length > 0) {
          console.log('————app onBackKeyDown modal hide')
          window.app.dialog.close()
          window.app.popup.close()
          window.app.popover.close()
          window.app.actions.close()
          // return false
        } else if (window.app.views.main.router.url === '/') {
          console.log('————app onBackKeyDown exitApp')
          navigator.app.exitApp()
        } else {
          console.log('————app onBackKeyDown back')
          mainView.router.back()
        }
      }
    },
    setColors: function () { // '#63bbd0' '#00bcd4' '#f0c023'
      const statusBarOpacity = 'ff'
      document.querySelector("meta[name='theme-color']").setAttribute('content', `${this.f7Params.mainColor}`)
      document.querySelector(':root').style.setProperty('--app-main-bg-color', `${this.f7Params.mainBgColor}`)
      document.querySelector(':root').style.setProperty('--app-main-color', ` ${this.f7Params.mainColor}`)

      if (!!window.cordova && !!window.StatusBar && window.cordova.platformId === 'android') {
      // window.StatusBar.overlaysWebView(true)
        window.StatusBar.backgroundColorByHexString(`#${statusBarOpacity}${this.f7Params.mainBgColor.split('#')[1]}`)
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

    this.$store.commit('setAllNotes', {})

    // dialosg test
    app.dialog.progress()
    setTimeout(function () {
      app.dialog.close()
    }, 1000)
  },
  computed: {
    ...mapGetters(['navbarStyle'])
  }
}
</script>

<style lang="less">
// ionicons
@import "~framework7-icons/css/framework7-icons.css";
@import "assets/fontello/css/fontello.css";

// :root {
//   --f7-card-border-radius: 0.625rem !important;
//   --f7-searchbar-in-page-content-input-border-radius: 0.625rem !important;
//   --f7-searchbar-input-border-radius: 0.625rem !important;
//   --f7-theme-color: black !important;
//   --f7-fab-pressed-bg-color: var(--app-main-color);
// }

:root {
  --f7-page-bg-color: var(--app-main-bg-color);
  --f7-navbar-bg-color: var(--app-main-bg-color);
  --f7-searchbar-bg-color: var(--app-main-bg-color);
  --f7-searchbar-input-font-size: 0.875rem !important;
  --nav-move-height: calc(var(--f7-navbar-height) * -1);
}

// .ios {
//   --f7-fab-box-shadow: 0 0 0 !important;
//   .navbar:after,
//   .toolbar-bottom:before,
//   .toolbar-bottom:after {
//     height: 0;
//   }
//   .navbar .link {
//     padding: 0 0.3125rem;
//   }
// }

// :focus {
//   outline-width: 0rem;
// }

.main-text-color {
  &,
  & span {
    color: var(--app-main-color);
  }
}
.main-bg-color {
  background-color: var(--app-main-color);
}

// i {
//   font-size: 1.75rem;
// }

.navbar,
.subnavbar {
  background-color: var(--app-main-bg-color) !important;
  a:not(.a-color-self) {
    color: var(--app-main-color) !important;
  }
  &::after {
    height: 0 !important;
  }
}
.navbar {
  .subnavbar-inner {
    padding: 0 25px !important;
    opacity: 0.5;
  }
}

// a {
//   padding: 0 !important;
// }

// // must put here then work
// .searchbar {
// }
// .searchbar-inner {
//   overflow: hidden;
//   .searchbar-input-wrap {
//     overflow: hidden;
//   }
// }

// .popover的三角形
.popover-angle {
  display: none;
}

html {
  font-size: 16px;
}
</style>
