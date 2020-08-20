<template>
  <v-col>
    <section-intro
      :landscape="isLandscape"
      :mobile="isLandscape"
      :title="apodTitle"
    >
      <template #mobile>
        <buttons-row
          :buttons="buttons"
          :mobile="checkMobileNavigation"
          @today="onClickToday"
          @prevDay="onClickPrev"
          @nextDay="onClickNext"
        />
      </template>
    </section-intro>

    <v-row no-gutters>
      <v-col
        v-if="Object.keys(apodData).length"
        :cols="landscapeColsSize"
        class="ma-0 pa-0"
      >
        <v-col
          v-if="!checkMobileNavigation"
          class="ma-0 pa-0"
        >
          <image-full-frame
            v-if="!isVideo"
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
          />
          <video-component
            v-else
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
          />
        </v-col>

        <v-col
          v-else
          class="ma-0 pa-0"
        >
          <image-full-frame-mobile
            v-if="!isVideo"
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
          />
          <video-component
            v-else
            :copyright="copyright"
            :description="apodData.explanation"
            :mobile="checkMobileNavigation"
            :src="apodSrc"
            :title="apodData.title"
          />
        </v-col>
      </v-col>

      <v-col :cols="landscapeColsSize">
        <v-col
          :class="{'pa-0': !isLandscape}"
          class="py-0"
        >
          <buttons-row
            v-if="!checkMobileNavigation || !isLandscape"
            :buttons="buttons"
            :mobile="checkMobileNavigation"
            @today="onClickToday"
            @prevDay="onClickPrev"
            @nextDay="onClickNext"
          />
          <v-col class="pa-0">
            <v-date-picker
              v-model="datePickerDate"
              :disabled="disabled"
              :first-day-of-week="1"
              :max="today"
              :min="minDateAPOD"
              :reactive="true"
              :show-current="true"
              :full-width="true"
              @change="onChangeDate"
            />
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import buttonsRow from '@/components/core/buttonsRow'
import imageFullFrame from '@/components/molecules/imageFull/ImageFullFrame'
import imageFullFrameMobile from '@/components/molecules/imageFull/ImageFullFrameMobile'
import sectionIntro from '@/components/core/sectionIntro'
import videoComponent from '@/components/core/videoPlayer'

export default {
  name: 'Home',
  components: {
    buttonsRow,
    imageFullFrame,
    imageFullFrameMobile,
    sectionIntro,
    videoComponent
  },
  data () {
    return {
      apodTitle: "NASA Image of the Day",
      disabled: false,
      minDateAPOD: "2015-01-01"
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
  mounted () {
    if (!this.datePickerDate) this.datePickerDate = this.today
    if(isEmpty(this.apodData)) this.getApod()
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
