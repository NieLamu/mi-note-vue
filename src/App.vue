<template>
  <div id="app">
    <!-- Main Framework7 App component where we pass Framework7 params -->
    <f7-app :params="{ theme: 'auto', name: 'My App', id: 'com.demoapp.test' }">
      <!-- Status bar overlay for full screen mode (Cordova or PhoneGap) -->
      <f7-statusbar></f7-statusbar>
      <!-- Your main view, should have "main" prop -->
      <!-- Left Panel with "cover" effect -->
        <f7-panel left cover>
          <f7-view>
            <f7-page>
              <f7-navbar title="Left Panel"></f7-navbar>
              <f7-block>
                <p>Here comes the left panel text</p>
              </f7-block>
            </f7-page>
          </f7-view>
        </f7-panel>

        <!-- Right Panel with "reveal" effect -->
        <f7-panel right reveal>
          <f7-view>
            <f7-page>
              <f7-navbar title="Right Panel"></f7-navbar>
              <f7-block>
                <p>Here comes the right panel text</p>
              </f7-block>
            </f7-page>
          </f7-view>
        </f7-panel>

        <!-- Main view-->
        <f7-view main>
          <f7-page>
            <f7-navbar title="Awesome App"></f7-navbar>
            <!-- Page content -->
            <f7-block>
              <p>Here comes main view page text</p>
            </f7-block>
            <!-- Buttons to open panels -->
            <f7-row>
              <f7-col>
                <f7-button panel-open="left">Left Panel</f7-button>
              </f7-col>
              <f7-col>
                <f7-button panel-open="right">Right Panel</f7-button>
              </f7-col>
            </f7-row>
            <!-- Button to open popup -->
            <f7-button popup-open="#my-popup">Open Popup</f7-button>
          </f7-page>
        </f7-view>

        <!-- Popup. All modals should be outside of Views -->
        <f7-popup id="my-popup">
          <f7-view>
            <f7-page>
              <f7-navbar title="Popup">
                <!-- Link to close popup -->
                <f7-nav-right>
                  <f7-link popup-close>Close</f7-link>
                </f7-nav-right>
              </f7-navbar>
              <f7-block>
                <p>Here comes popup text</p>
              </f7-block>
            </f7-page>
          </f7-view>
        </f7-popup>
    </f7-app>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ion-page {
  align-items: center;
}

ion-header a {
  text-decoration: none;
}

.title-btn-hide {
  opacity: 0;
}
</style>
