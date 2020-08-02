import axios from 'axios'
import isMobile from 'is-mobile'
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
    apod: {},
    dateApod: null,
  },
  getters: {
    apodData: (state) => (state.apod),
    isMobileBrowser: () => (isMobile()),
    selectedApodDate: (state) => (state.dateApod)
  },
  mutations: {
    updateApod (state, date) {
      state.apod = date
    },
    updateDateApod (state, date) {
      state.dateApod = date
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
    },
    setApodDate ({ commit }, date) {
      commit('updateDateApod', date)
    }
  },
  plugins: [vuexLocal.plugin]
})
