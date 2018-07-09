import { mapState } from 'vuex'
import buttonBar from './buttonBar/index.vue'

export default {
  components: {
    buttonBar
  },

  computed: {
    ...mapState('poHelper', [
      'poNotes'
    ])
  }
}
