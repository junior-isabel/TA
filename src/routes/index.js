import VueRouter from 'vue-router'
const routes = [
  {
    path: '/',
    component: require('@/views/home').default,
    children: [
      {
        path: 'checkout/:date',
        name: 'checkout',
        component: require('@/views/checkout').default
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router