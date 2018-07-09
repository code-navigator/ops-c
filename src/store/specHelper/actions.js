import api from '@Api/api'

export default {
  // Add new node to the tree
  addNode ({commit}) {
    commit('addNode')
    commit('openNode')
  },

  // Add a requirement to the list
  addRequirement ({commit}) {
    commit('addRequirement')
  },

  // Cancel edit and discard changes
  cancelEdit ({state, dispatch}) {
    // Reload requirements for currently selected node
    dispatch('getNodes')
    dispatch('getRequirements', state.currentNode)
    // Toggle off edit mode
    dispatch('edit')
  },

  // Copy node in tree
  copyInsertNode ({commit}, data) {
    commit('copyInsertNode', data)
  },

  // Make a copy of the current node
  copyNode ({commit}) {
    commit('copyNode')
  },

  // Cut out node (i.e., make a copy and remove the original node)
  cutNode ({commit, dispatch}) {
    dispatch('copyNode')
    dispatch('removeNode')
  },

  // Toggle the node edit mode
  // Called after a save or cancel operation
  edit ({commit}) {
    commit('edit')
    // Clear array containing deleted requirements
    commit('clearDeletedRequirements')
  },

  // Get nodes to display in tree
  async getNodes ({state, commit}) {
    var nodes = await api.get(state.moduleName + '/nodes')
    commit('setNodes', nodes.data)
  },

  // Get requirements for currently selected node
  async getRequirements ({state, commit}, data) {
    var id = data.id
    if (!state.isEdit) {
      var requirements = await api.get(state.moduleName + '/requirements', {id: id})
      // Add requirements to displayed list
      commit('getRequirements', requirements.data)
    } else {
      commit('getRequirements', data.requirements)
    }
  },

  // Move node in tree
  moveNode ({commit, dispatch}, data) {
    // First, remove it from its original location
    dispatch('removeNode')
    // Then move it to its new location
    commit('moveNode', data)
  },

  // Paste copy of node at current location
  pasteNode ({commit}) {
    commit('pasteNode')
  },

  // Remove a node from the tree
  removeNode ({commit}) {
    commit('removeNode')
  },

  // Remove all requirements attached to current Node
  removeAllRequirements ({commit}) {
    commit('removeAllRequirements')
  },

  // Remove a requirement from the list
  removeRequirement ({commit}) {
    commit('removeRequirement')
  },

  // Change requirement's position in the list
  reorderRequirements ({dispatch, commit}, data) {
    commit('reorderRequirements', data)
  },

  // Persist changes to the database
  async save ({state, commit, dispatch}) {
    await api.put(state.moduleName + '/nodes', state.nodes.children)

    // Remove deleted nodes from database
    await api.delete(state.moduleName + '/nodes', state.deletedNodes)
    commit('clearDeletedNodes')

    await api.delete(state.moduleName + '/requirements', state.deletedRequirements)
    commit('clearDeletedRequirements')

    // Toggle edit mode
    dispatch('edit')
  },

  // Set currently selected node
  async selectNode ({ commit, dispatch }, data) {
    // Display requirements for currently selected node
    await dispatch('getRequirements', data)
    commit('selectNode', data)
    commit('clearTabs')
  },

  // Set currently selected requirement
  selectRequirement ({commit, dispatch}, data) {
    commit('selectRequirement', data)
  },

  // Toggle Nodes to show children
  toggleNode ({commit}, data) {
    commit('toggleNode', data)
  },

  // Retrieve document (spec or procedure)
  test ({state, commit}, data) {
    console.log(data.length)
    data = {title: data}
    api.get(state.moduleName + '/test.pdf', data)
      .then((result) => Promise.resolve(result))
      .then(function (result) {
        commit('test', result)
        commit('addTab', {
          title: data.title,
          url: result.config.url
        })
      })
  }
}
