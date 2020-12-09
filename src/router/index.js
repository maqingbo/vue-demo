import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'scrollTo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ScrollTo')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/svg',
    name: 'Svg',
    component: () => import(/* webpackChunkName: "about" */ '../views/SvgCom')
  },
  {
    path: '/g2',
    name: 'G2',
    component: () => import(/* webpackChunkName: "about" */ '../views/G2Com')
  },
  {
    path: '/scrollTo',
    name: 'scrollTo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ScrollTo')
  }
]

const router = new VueRouter({
  routes
})

export default router
