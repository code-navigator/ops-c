export default {
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
