import { createRouter, createWebHashHistory } from 'vue-router'
import Location from '../views/location/Location'
import Beacon from '../views/beacon/Beacon'
const routes = [
  {
    path: '/',
    name: 'Location',
    component: Location
  },
  {
    path: '/beacon',
    name: 'Beacon',
    component: Beacon
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
