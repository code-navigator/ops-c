export default {
  methods: {
    // Pass up event to parent component to handle
    toggleDrawer () {
      this.$emit('click')
    }
  }
}
