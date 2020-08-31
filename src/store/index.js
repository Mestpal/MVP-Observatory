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

let params = {}

export default new Vuex.Store({
  state: {
    apod: {},
    darkTheme: true,
    dateApod: null,
    dateEpic: null,
    epic: null
  },
  getters: {
    apodData: (state) => (state.apod),
    epicData: (state) => (state.epic),
    isDarkTheme: (state) => (state.darkTheme),
    isMobileBrowser: () => (isMobile()),
    selectedApodDate: (state) => (state.dateApod),
    selectedEpicDate: (state) => (state.dateEpic)
  },
  mutations: {
    updateApodData (state, data) {
      state.apod = data
    },
    updateEpicData (state, data) {
      state.epic = data
    },
    updateTheme (state) {
      state.darkTheme = !state.darkTheme
    },
    updateDateApod (state, date) {
      state.dateApod = date
    }
  },
  actions: {
    async getApod ({ commit }, date) {
      params = {
        api_key: process.env.VUE_APP_NASA_APIKEY,
      }

      if (date) {
        params.date = date
      }

      const apod = await axios.get(`${process.env.VUE_APP_NASA_API_BASE_URL}planetary/apod`, {
        params: params
      })
      commit('updateApodDate', apod.data)
    },
    async getEpic ({ commit }, date) {
      if (date) {
        params.date = date
      }

      const epic = await axios.get(`${process.env.VUE_APP_NASA_EPIC_BASE_URL}natural`, {
        params: params
      })
      commit('updateEpicData', epic.data)
    },
    setApodDate ({ commit }, date) {
      commit('updateDateApod', date)
    },
    updateTheme ({ commit }) {
      commit('updateTheme')
    }
  },
  plugins: [vuexLocal.plugin]
})
