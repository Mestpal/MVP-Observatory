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
    apod: {},
    manifest: {}
  },
  getters: {
    apodData: (state) => (state.apod),
    manifest: (state) => (state.manifest)
  },
  mutations: {
    updateApod (state, data) {
      state.apod = data
    },
    updateManifest (state, data) {
      state.manifest = data
    }
  },
  actions: {
    async getApod ({ commit }) {
      const apod = await axios.get(`${process.env.VUE_APP_NASA_API_BASE_URL}planetary/apod`, {
        params: {
          api_key: process.env.VUE_APP_NASA_APIKEY
        }
      })
      commit('updateApod', apod.data)
    },
    async roverManifest ({ commit }, roverName) {
      const manifest = await axios.get(`${process.env.VUE_APP_NASA_API_BASE_URL}mars-photos/api/v1/manifests/${roverName}`, {
        params: {
          api_key: process.env.VUE_APP_NASA_APIKEY
        }
      })
      commit('updateManifest', manifest.data.photo_manifest)
    }
  },
  plugins: [vuexLocal.plugin]
})
