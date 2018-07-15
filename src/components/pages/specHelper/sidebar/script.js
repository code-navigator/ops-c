import { mapState, mapActions, mapGetters } from 'vuex'
import contextMenu from '@Controls/contextMenu/index'
import tree from '@Controls/tree/index'

export default {
  // Load custom components
  components: {
    contextMenu: contextMenu,
    tree: tree
  },

  computed: {
    // State variables
    ...mapState('specHelper', [
      'nodes',
      'isEdit',
      'nodeIsClipped'
    ]),

    ...mapGetters('specHelper', [
      'currentNodeId'
    ]),

    // Define context menu options
    menuItems () {
      return [
        {
          title: 'Edit',
          handler: this.edit,
          show: !this.isEdit,
          shortcut: ['ctrl', 'alt', 'e'],
          separator: true
        },
        {
          title: 'Expand All',
          handler: this.expandNode,
          show: !this.isEdit,
          shortcut: ['ctrl', 'alt', 'arrowdown'],
          separator: false
        },
        {
          title: 'Collapse All',
          handler: this.collapseNode,
          show: !this.isEdit,
          shortcut: ['ctrl', 'alt', 'arrowup'],
          separator: false
        },
        {
          title: 'Copy',
          handler: this.copyNode,
          show: this.isEdit,
          separator: false
        },
        {
          title: 'Cut',
          handler: this.cutNode,
          show: this.isEdit,
          separator: !this.nodeIsClipped
        },
        {
          title: 'Paste',
          handler: this.pasteInCopyOfNode,
          show: (this.isEdit && this.nodeIsClipped),
          separator: this.nodeIsClipped
        },
        {
          title: 'Add',
          handler: this.addNode,
          show: this.isEdit,
          separator: false
        },
        {
          title: 'Remove',
          handler: this.removeNode,
          show: this.isEdit,
          separator: true
        },
        {
          title: 'Save',
          handler: this.save,
          shortcut: ['ctrl', 'alt', 's'],
          show: this.isEdit,
          separator: false
        },
        {
          title: 'Cancel',
          handler: this.cancelEdit,
          shortcut: ['ctrl', 'alt', 'esc'],
          show: this.isEdit,
          separator: false
        }
      ]
    }
  },

  data () {
    return {
      menuEvents: Object // Events for displaying Menu
    }
  },

  created () {
    // Load node data before mounting component
    this.getNodes()
  },

  methods: {
    // Actions
    ...mapActions('specHelper', [
      'addNode',
      'cancelEdit',
      'copyNode',
      'cutNode',
      'edit',
      'getNodes',
      'pasteInCopyOfNode',
      'removeNode',
      'save',
      'selectNode',
      'toggleNode'
    ]),

    // Show menu
    show (e) {
      // Save event variable to update Menu props
      this.menuEvents = e
      // Hide standard menu
      e.preventDefault()
    },

    expandNode (state) {
      this.$store.dispatch('specHelper/toggleNode', true)
    },

    collapseNode (state) {
      this.$store.dispatch('specHelper/toggleNode', false)
    }
  }
}
