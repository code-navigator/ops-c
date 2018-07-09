import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('poHelper', [
      'copy',
      'reset'
    ])
  }
}
