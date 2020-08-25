<template>
  <v-col>
    <section-info-block>
      <template #title>
        <h1 class="text-center">
          Welcome to MVP-Observatory
        </h1>
      </template>
    </section-info-block>

    <v-col>
      <v-expansion-panels
        v-model="openPanel"
        flat
        multiple
        outline
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h2>
              NASA
            </h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              Here you can consult the public data of the NASA, choose one of
              the available sections to start exploring
            </p>
            <select-section-menu />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

import sectionInfoBlock from '@/components/core/sectionInfoBlock'
import selectSectionMenu from '@/components/core/selectSectionMenu'

export default {
  name: 'Home',
  components: {
    sectionInfoBlock,
    selectSectionMenu
  },
  data () {
    return {
      // apodTitle: "NASA Image of the Day",
      // disabled: false,
      // minDateAPOD: "2015-01-01"
      openPanel: [0]
    }
  },
  computed: {
    ...mapGetters([
      'apodData',
      'isMobileBrowser',
      'selectedApodDate'
    ]),
    apodSrc () {
      return  this.apodData.url || this.apodData.hdurl || ''
    },
    buttons () {
      return [
        {
          condition: this.minDateAPOD !== this.datePickerDate,
          event: 'prevDay',
          icon: "mdi-skip-previous",
          text: 'Previous'
        },
        {
          color: 'orange',
          condition: this.today !== this.datePickerDate,
          event: 'today',
          icon: "mdi-calendar-today",
          text: 'Today'
        },
        {
          condition: this.today !== this.datePickerDate,
          event: 'nextDay',
          icon: "mdi-skip-next",
          text: 'Next'
        }
      ]
    },
    checkMobileNavigation () {
      return this.isMobileBrowser || this.$vuetify.breakpoint.smAndDown
    },
    copyright () {
      return this.apodData.copyright || null
    },
    datePickerDate: {
      get () {
        return this.selectedApodDate || this.today
      },
      set (newDate) {
        this.setApodDate(newDate)
      }
    },
    landscapeColsSize () {
      return this.isLandscape ? 6 : 12
    },
    isLandscape () {
      return this.checkMobileNavigation && this.$vuetify.breakpoint.smAndUp
    },
    isVideo () {
      return this.apodData.media_type === 'video'
    },
    today () {
      return moment().toISOString().substr(0, 10)
    }
  },
  methods: {
    ...mapActions([
      'getApod',
      'setApodDate'
    ]),
    async onChangeDate () {
      this.disabled = true
      await this.getApod(this.selectedApodDate)
      this.disabled = false
    },
    onClickNext () {
      const nextDate = moment(this.datePickerDate, 'YYYY-MM-DD').hour(23)
        .add(1, 'days')
        .toISOString()
        .substr(0, 10)
      this.datePickerDate = nextDate
      this.onChangeDate()
    },
    onClickPrev () {
      const prevDate = moment(this.datePickerDate, 'YYYY-MM-DD').hour(23)
        .subtract(1, 'days')
        .toISOString()
        .substr(0, 10)
      this.datePickerDate = prevDate
      this.onChangeDate()
    },
    onClickToday () {
      this.datePickerDate = this.today
      this.onChangeDate()
    }
  }
}
</script>
