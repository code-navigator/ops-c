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
    this.getAllLists()
  },

  methods: {
    ...mapActions('poHelper', [
      'getAllLists',
      'updateSelectedFilter'
    ]),

    onChange (filter, value) {
      this.updateSelectedFilter({
        filter: filter,
        value: value
      })
    }
  }
}
