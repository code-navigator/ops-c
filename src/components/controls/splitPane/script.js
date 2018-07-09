import splitPane from 'vue-splitpane'

export default {
  props: {
    defaultPercent: Number,
    maxPercent: Number,
    minPercent: Number
  },

  components: {
    splitPane
  }
}
