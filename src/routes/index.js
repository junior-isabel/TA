import VueRouter from 'vue-router'
const routes = [
  {
    path: '/',
    component: require('@/views/home').default
  }
]
const router = new VueRouter({
  routes
})

export default router