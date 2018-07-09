export default {
  props: [
    'drawer',
    'routes'
  ],

  computed: {
    position: {
      get () {
        return this.drawer
      },
      set (newValue) {
      }
    }
  }
}
