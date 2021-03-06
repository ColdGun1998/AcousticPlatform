import { createRouter, createWebHashHistory } from 'vue-router'
import Location from '../views/location/Location'
import Beacon from '../views/beacon/Beacon'
import Login from '../views/login/Login'
import Scene from '../views/scene/Scene'
import AddScene from '../views/scene/AddScene'
import History from '../views/history/History'
import Account from '../views/account/Account'

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
  },
  {
    path: '/addScene',
    name: 'AddScene',
    component: AddScene
  },
  {
    path: '/scene',
    name: 'Scene',
    component: Scene
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
