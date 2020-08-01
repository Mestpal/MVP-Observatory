import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: 'vuespace',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    apod: {}
  },
  getters: {
    apodData: (state) => (state.apod)
  },
  mutations: {
    updateApod (state, data) {
      state.apod = data
    }
  },
  actions: {
    async getApod ({ commit }, date) {
      const params = {
        api_key: process.env.VUE_APP_NASA_APIKEY,
      }

      if (date) {
        params.date = date
      }

      const apod = await axios.get(`${process.env.VUE_APP_NASA_API_BASE_URL}planetary/apod`, {
        params: params
      })
      commit('updateApod', apod.data)
    }
  },
  plugins: [vuexLocal.plugin]
})
