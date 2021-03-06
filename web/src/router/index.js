import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/drafts',
    name: 'Drafts',
    component: () =>
      import(/* webpackChunkName: "new-post" */ '../views/Drafts.vue')
  },
  {
    path: '/post/new',
    name: 'NewPost',
    component: () =>
      import(/* webpackChunkName: "new-post" */ '../views/NewPost.vue')
  },
  {
    path: '/post/:id/edit',
    name: 'EditPost',
    component: () =>
      import(/* webpackChunkName: "new-post" */ '../views/EditPost.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
