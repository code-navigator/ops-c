import appContent from '@Layouts/appContent/index'
import appDrawer from '@Layouts/appDrawer/index'
import appFooter from '@Layouts/appFooter/index'
import appHeader from '@Layouts/appHeader/index'
import { routes } from '@Router/routes'

export default {
  name: 'App',

  data: () => ({
    // Drawer position (false = in; true = out)
    drawer: false,
    // Routes for navigation menu
    routes
  }),

  components: {
    appContent,
    appDrawer,
    appFooter,
    appHeader
  },

  methods: {
    // Toggle drawer in and out
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
