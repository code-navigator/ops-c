import Vue from 'vue'
import Vuex from 'vuex'
import poHelper from './poHelper/index'
import specHelper from './specHelper/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    poHelper: poHelper,
    specHelper: specHelper
  }
})
