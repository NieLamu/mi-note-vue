import Home from './pages/Home.vue'
import Note from './pages/Note.vue'

import NotFound from './pages/404.vue'

// Pages
export default [
  // list page
  {
    path: '/',
    component: Home
  },
  // edit page
  {
    path: '/note/:noteId/:type',
    component: Note
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound
  }
]
