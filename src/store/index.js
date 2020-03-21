import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resultadosMapa:[
    ]
  },
  mutations: {
    setResultadosMapa(state,payload){
      state.resultadosMapa=payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
