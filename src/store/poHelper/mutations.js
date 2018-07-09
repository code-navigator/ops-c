import Clipboard from 'clipboard-copy'

export default {
  // Copy PO notes to clipboard
  copy (state) {
    Clipboard(state.poNotes)
  },

  // Reset store state
  reset (state) {
    for (var prop in state.selectedFilters) {
      state.selectedFilters[prop] = ''
    }

    state.poNotes = []
  },

  // Save lists of filter options to store
  setLists (state, filters) {
    state.lists = filters
  },

  // Save filtered PO Notes to store
  setPONotes (state, poNotes) {
    state.poNotes = poNotes
  },

  // Update filters in store
  updateSelectedFilter (state, filter) {
    state.selectedFilters[filter.filter] = filter.value
  }
}
