import api from '@Api/api'
import Clipboard from 'clipboard-copy'

export default {
  // Copy PO notes to clipboard
  copy ({state}) {
    Clipboard(state.poNotes)
  },

  // Retrieve lists for filter selections
  async getAllLists ({commit, state}) {
    const response = await api.get(
      state.moduleName +
      '/filterlists'
    )

    commit('setLists', response.data)
  },

  // Send filter state to api to update PO notes
  async getFilteredNotes ({dispatch, state}) {
    await api.post(
      state.moduleName +
      '/ponotes',
      state.selectedFilters
    )

    dispatch('getPONotes')
  },

  // Get filtered PO notes
  async getPONotes ({commit, state}) {
    const response = await api.get(
      state.moduleName +
      '/ponotes' +
     '?num=' +
      new Date().getTime()
    )

    commit('setPONotes', response.data)
  },

  // Reset store state
  reset ({commit, state}) {
    // Clear each filter propery
    for (var prop in state.selectedFilters) {
      commit('updateSelectedFilter', {filter: prop, value: ''})
    }
    // Clear PO notes
    commit('setPONotes', [])
  },

  // Update filter values in store
  updateSelectedFilter ({commit, dispatch}, filter) {
    commit('updateSelectedFilter', filter)
    dispatch('getFilteredNotes')
  }
}
