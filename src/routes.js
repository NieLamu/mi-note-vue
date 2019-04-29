import Home from './pages/home.vue'

import NotFound from './pages/404.vue'

// Pages
export default [
  // Index page
  {
    path: '/',
    component: Home
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound
  }
]
