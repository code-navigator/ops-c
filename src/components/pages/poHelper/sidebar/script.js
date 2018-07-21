import { mapState, mapActions } from 'vuex'
import checkBox from '@Controls/checkBox/index.vue'
import datePicker from '@Controls/datePicker/index.vue'
import dropdownList from '@Controls/dropdownList/index.vue'
import textBox from '@Controls/textBox/index.vue'

export default {
  components: {
    checkBox,
    datePicker,
    dropdownList,
    textBox
  },

  computed: {
    ...mapState('poHelper', [
      'lists',
      'selectedFilters'
    ])
  },

  created () {
    // Populate select lists
    this.getAllLists()
  },

  methods: {
    ...mapActions('poHelper', [
      'getAllLists',
      'updateSelectedFilter'
    ]),

    // Update filter in store
    onChange (filter, value) {
      this.updateSelectedFilter({
        filter: filter,
        value: value
      })
    }
  }
}
