import Vue from 'vue'
import Vuex from 'vuex'
import notification from './modules/notification'
import appState from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { appState, notification }
})