import moment from 'moment'
import isMobile from 'is-mobile'


export default {
  computed: {
    checkMobileNavigation () {
      return isMobile() || this.$vuetify.breakpoint.smAndDown
    },
    isLandscape () {
      return this.checkMobileNavigation && this.$vuetify.breakpoint.smAndUp
    },
    moment () {
      return moment
    },
    previewWitdhMobile () {
      return this.isLandscape ? "60vw" : "65vw"
    },
    today () {
      return moment().toISOString().substr(0, 10)
    }
  }
}