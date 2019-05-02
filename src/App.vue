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
    // Demo Theme
    let theme = 'auto'
    if (document.location.search.indexOf('theme=') >= 0) {
      theme = document.location.search.split('theme=')[1].split('&')[0]
    }

    return {
      f7Params: {
        name: 'MI NOTE',
        id: 'io.github.NieLamu',
        theme,
        routes,
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
  methods: {},
  mounted () {
    const mainBgColor = '#f0c023'// '#00bcd4'
    const mainColor = '#f0c023'
    const statusBarOpacity = 'ff'
    this.$f7ready(f7 => {
      console.log('f7', f7)
      window.$f7 = f7
      if (!!window.cordova && !!window.StatusBar && window.cordova.platformId === 'android') {
        // window.StatusBar.overlaysWebView(true)
        window.StatusBar.backgroundColorByHexString(`#${statusBarOpacity}${mainBgColor.split('#')[1]}`)
      }
      window.$f7.dialog.progress()
      setTimeout(function () {
        window.$f7.dialog.close()
      }, 1000)
      const platform = document.querySelector('.md') || document.querySelector('.ios')
      platform.setAttribute('style', `--f7-page-bg-color: ${mainBgColor} !important`)
      document.querySelector("meta[name='theme-color']").setAttribute('content', `${mainBgColor}`)

      document.querySelector(':root').style.setProperty('--main-bg-color', `${mainBgColor}`)
      document.querySelector(':root').style.setProperty('--main-color', ` ${mainColor}`)
    })
  }
}
</script>

<style lang="less">
// ionicons
@import "~ionicons/dist/css/ionicons.min.css";

:root {
  --nav-move-height: calc(var(--f7-navbar-height) * -1);
  --f7-card-border-radius: 0.625rem !important;
  --f7-searchbar-in-page-content-input-border-radius: 0.625rem !important;
  --f7-searchbar-input-border-radius: 0.625rem !important;
  --f7-theme-color: black !important;
}

.md {
  --f7-searchbar-in-page-content-margin: 0rem !important;
  --f7-popover-box-shadow: 0 0 0 !important;
  --f7-searchbar-in-page-content-border-radius: 0 !important;
  --f7-searchbar-in-page-content-box-shadow: 0 0 0 !important;
  --f7-searchbar-input-padding-horizontal: 35px !important;
  --f7-fab-box-shadow: 0 0 0 !important;
  --f7-fab-size: 50px !important;
  .searchbar {
    --f7-searchbar-input-extra-padding-left: 0px !important;
  }
  .navbar:before {
    height: 0;
  }
  .list .item-media {
    min-width: 0px !important;
  }
}
.ios {
  --f7-fab-box-shadow: 0 0 0 !important;
  .navbar {
    &:after {
      height: 0;
    }
  }
}

.main-color {
  color: var(--main-color);
}

.navbar {
  background-color: var(--main-bg-color) !important;
  a {
    color: black !important;
  }
}

.popover {
  width: auto !important;
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
  overflow-x: hidden;
}
.searchbar-input-wrap {
  overflow-x: hidden;
}
</style>
