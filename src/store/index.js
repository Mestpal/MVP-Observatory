import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    apod: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    updateApod (state, data) {
      state.apod = data
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    },

    async getApod ({ commit }) {
      const apod = await axios.get(`${process.env.VUE_APP_NASA_API_BASE_URL}planetary/apod`, {
        params: {
          api_key: process.env.VUE_APP_NASA_APIKEY
        }
      })
      console.log(apod)
      commit('updateApod', apod)
    }
  },
  modules: {
  }
})
