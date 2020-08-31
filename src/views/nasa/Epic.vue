<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1
          v-if="checkMobileNavigation"
          class="text-center"
          v-text="epicTitle"
        />
        <h2
          v-else
          class="text-center"
          v-text="epicTitle"
        />
      </template>
    </section-info-block>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'


import sectionInfoBlock from '@/components/core/sectionInfoBlock'

export default {
  components: {
    sectionInfoBlock
  },
  data() {
    return {
      epicTitle: "EPIC: Earth captures of astronomical events",
      datePickerDate: null
    }
  },
  computed: {
    ...mapGetters([
      'epicData',
      'isMobileBrowser',
      'selectedEpicDate'
    ]),
    checkMobileNavigation () {
      return this.isMobileBrowser || this.$vuetify.breakpoint.smAndDown
    },
    today () {
      return moment().toISOString().substr(0, 10)
    }
  },
  mounted () {
    if (!this.datePickerDate) this.datePickerDate = this.today
    if(isEmpty(this.apodData)) this.getEpic()
  },
  methods: {
    ...mapActions([
      'getEpic',
      'setApodDate'
    ]),
  }
}
</script>