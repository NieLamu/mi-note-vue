
/* Import pages components */
import HomePage from './views/Home.vue'
import LoginPage from './views/Login.vue'

/*
Now we need to map components to routes.
We need to pass them along with the F7 app parameters to <f7-app> component
*/

export default {
  name: 'MI NOTE',
  id: 'io.github.NieLamu',
  // specify routes for app
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/about',
      async (routeTo, routeFrom, resolve, reject) {
        console.log('about', routeTo, routeFrom, resolve, reject)
        // dynamic import component; returns promise
        const vueComponent = () => import('./views/About.vue')
        // resolve promise
        vueComponent().then((vc) => {
          // resolve with component
          resolve({ component: vc.default })
        })
      }
    },
    {
      path: '/login',
      component: LoginPage
    }
    // ...
  ]
  // ...
}
