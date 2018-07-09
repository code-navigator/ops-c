import api from '@Api/api'

export default {
  // Copy PO notes to clipboard
  copy ({commit}) {
    commit('copy')
  },

  // Retrieve lists for filter selections
  async getAllLists ({state, commit}) {
    const response = await api.get(
      state.moduleName +
      '/filterlists'
    )

    commit('setLists', response.data)
  },

  // Send filter state to api to update PO notes
  async getFilteredNotes ({state, dispatch}) {
    await api.post(
      state.moduleName +
      '/ponotes',
      state.selectedFilters
    )

    dispatch('getPONotes')
  },

  // Get filtered PO notes
  async getPONotes ({state, commit}) {
    const response = await api.get(
      state.moduleName +
      '/ponotes' +
     '?num=' +
      new Date().getTime()
    )

    commit('setPONotes', response.data)
  },

  // Reset store state
  reset ({commit}) {
    commit('reset')
  },

  // Update filter values in store
  updateSelectedFilter ({dispatch, commit}, filter) {
    commit('updateSelectedFilter', filter)
    dispatch('getFilteredNotes')
  }
}
