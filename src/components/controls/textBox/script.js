export default {
  props: [
    'label',
    'value'
  ],

  computed: {
    input: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('keyup', newValue.toUpperCase())
      }
    }
  }
}
