import poHelper from '@Pages/poHelper/index.vue'
import specHelper from '@Pages/specHelper/index.vue'

const routes = [
  {
    path: '/pohelper',
    name: 'PO Helper',
    component: poHelper,
    icon: 'folder'
  },
  {
    path: '/spechelper',
    name: 'Spec Helper',
    component: specHelper,
    icon: 'folder'
  }
]

export {
  routes
}
