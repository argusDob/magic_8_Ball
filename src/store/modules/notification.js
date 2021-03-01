const state = {
  msg: '',
  type: '',
}

const mutations = {
  NOTIFY (state, { msg, type }) {
    state.msg = msg
    state.type = type
  },
  REMOVE (state) {
    state.msg = ''
    state.type = ''
  },
}

const getters = {
  message: state => state.msg,
  alertClass: state =>  state.type,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}