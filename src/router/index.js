import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/cart/address'
  },
  {
    path:'/cart/:step',
    name: 'cart',
    component: Cart
  }
  
]

const router = new VueRouter({
  routes
})

export default router
