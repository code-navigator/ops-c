import {mapState, mapActions} from 'vuex'

export default {
  // component contains itself
  name: 'tree',

  props: {
    model: Object,
    id: '',
    readOnly: false
  },

  data () {
    return {
      source: {}
    }
  },

  computed: {
    ...mapState('specHelper', [
      'isEdit'
    ]),
    // Check if node contains other nodes (i.e., children)
    isFolder () {
      return (this.model.children) && (this.model.children.length)
    }
  },

  methods: {
    ...mapActions('specHelper', [
      'moveNode',
      'copyInsertNode'
    ]),
    // Toggle for expanding and collapsing node
    toggle (model) {
      if (this.isFolder) {
        this.model.open = !this.model.open
      }
      // Pass selected node to parent
      this.$emit('click', model)
    },

    // User selected node
    selectItem (model) {
      // Keep focus for editing node title
      if (!this.model.readOnly) {
        this.$refs.node.focus()
      }
      // Pass node to parent
      this.$emit('click', model)
    },

    // Node lost focus
    lostFocus () {
      if (!this.model.readOnly) {
        // Pass newly selected node to parent
        this.selectItem(this.model)
        // Make node read only
        this.model.readOnly = true
      }
    },

    // -- DRAG & DROP METHODS
    // Start drag
    dragStarted (item, e) {
      e.dataTransfer.setData('text/plain', e.target.innerHTML)
      e.dataTransfer.effectAllowed = 'move'
    },

    // Drag element
    draggingOver (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },

    // Drop element
    dropped (item, e) {
      e.preventDefault()
      e.stopPropagation()

      if (e.ctrlKey) {
        this.copyInsertNode(item)
      } else {
        this.moveNode(item)
      }
    }
  }
}
