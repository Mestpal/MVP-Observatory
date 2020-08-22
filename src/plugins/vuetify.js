import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#68999f',
        accent: '#e91e63',
        secondary: '#495862',
        success: '#4CAF50',
        info: '#74acac',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      dark: {
        primary: '#912979',
        accent: '#617670',
        secondary: '#253D5A',
        success: '#4CAF50',
        info: '#3B385C',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    },
  }
})
