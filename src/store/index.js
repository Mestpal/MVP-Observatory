import axios from 'axios'
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
    epic: null,
    epicAvailableDates: null
  },
  getters: {
    apodData: (state) => (state.apod),
    epicData: (state) => (state.epic),
    epicAvailableDates: (state) => (state.epicAvailableDates),
    isDarkTheme: (state) => (state.darkTheme),
    selectedApodDate: (state) => (state.dateApod),
  },
  mutations: {
    updateApodData (state, data) {
      state.apod = data
    },
    updateEpicData (state, data) {
      state.epic = data
    },
    updateEpicAvailableDates (state, data) {
      state.epicAvailableDates = data
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
      commit('updateApodData', apod.data)
    },
    async getEpic ({ commit }, date) {
      const epic = await axios.get(`${process.env.VUE_APP_NASA_EPIC_BASE_URL}natural/date/${date}`, {
        params: params
      })
      commit('updateEpicData', epic.data)
    },
    async getEpicDates ({commit}){
      const epic = await axios.get(`${process.env.VUE_APP_NASA_EPIC_BASE_URL}natural/all`)
      commit('updateEpicAvailableDates', epic.data)
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
