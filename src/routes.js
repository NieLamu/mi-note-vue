import Home from './pages/home.vue'
import Note from './pages/note.vue'

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
    path: '/note/:noteId',
    component: Note
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound
  }
]
