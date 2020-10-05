<template>
  <v-col class="pa-0">
    <section-info-block :media="isLandscape">
      <template #title>
        <h1
          class="text-center"
          v-text="apodTitle"
        />
      </template>

      <template #media>
        <buttons-row
          :buttons="buttons"
          :mobile="checkMobileNavigation"
          @today="onClickToday"
          @prevDay="onClickPrev"
          @nextDay="onClickNext"
        />
      </template>
    </section-info-block>

    <v-row no-gutters>
      <v-col
        v-if="Object.keys(apodData).length"
        :cols="landscapeColsSize"
      >
        <v-col
          v-if="!isVideo"
          class="pa-0"
        >
          <image-full-frame
            v-if="!checkMobileNavigation"
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
            class="justify-center"
            height="65vh"
          />
          <image-full-frame-mobile
            v-else
            :copyright="copyright"
            :description="apodData.explanation"
            :src="apodSrc"
            :title="apodData.title"
          />
        </v-col>
        <v-col v-else>
          <video-component
            :copyright="copyright"
            :description="apodData.explanation"
            :mobile="checkMobileNavigation"
            :src="apodSrc"
            :title="apodData.title"
          />
        </v-col>
      </v-col>

      <v-col v-if=" !isLandscape">
        <buttons-row
          :buttons="buttons"
          :mobile="checkMobileNavigation"
          @today="onClickToday"
          @prevDay="onClickPrev"
          @nextDay="onClickNext"
          @show-datepicker="onClickShowDatepicker"
        />
      </v-col>

      <v-col
        v-if="!checkMobileNavigation || isLandscape"
        :cols="landscapeColsSize"
      >
        <v-col
          :class="{'pa-0': !isLandscape}"
          class="py-0"
        >
          <v-date-picker
            v-model="datePickerDate"
            :disabled="disabledDatePicker"
            :first-day-of-week="1"
            :full-width="true"
            :max="today"
            :min="minDateAPOD"
            :reactive="true"
            :show-current="true"
            @change="onChangeDate"
          />
        </v-col>
      </v-col>
    </v-row>

    <overlay-info-mobile
      :show="showMobileDatePicker"
      @close="onCloseModal"
    >
      <template #content>
        <v-date-picker
          v-model="datePickerDate"
          :disabled="disabledDatePicker"
          :first-day-of-week="1"
          :full-width="true"
          :max="today"
          :min="minDateAPOD"
          :reactive="true"
          :show-current="true"
          @change="onChangeDate"
        />
      </template>
    </overlay-info-mobile>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import commons from '@/mixins/commons'
import buttonsRow from '@/components/core/buttonsRow'
import sectionInfoBlock from '@/components/core/sectionInfoBlock'

export default {
  name: 'Home',
  components: {
    imageFullFrame: () => import("@/components/molecules/imageFull/ImageFullFrame"),
    imageFullFrameMobile: () => import("@/components/molecules/imageFull/ImageFullFrameMobile"),
    overlayInfoMobile: () => import("@/components/core/overlayInfoMobile"),
    videoComponent: () => import("@/components/molecules/video/videoPlayer"),
    buttonsRow,
    sectionInfoBlock
  },
  mixins: [commons],
  data () {
    return {
      apodTitle: "NASA Image of the Day",
      disabledDatePicker: false,
      isfullImageVisible: false,
      minDateAPOD: "2015-01-01",
      showMobileDatePicker: false
    }
  },
  computed: {
    ...mapGetters([
      'apodData',
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
          condition: (this.today !== this.datePickerDate ) && (this.isLandscape || !this.checkMobileNavigation),
          event: 'today',
          icon: "mdi-calendar-today",
          text: 'Today'
        },
        {
          color: 'indigo',
          condition: !this.isLandscape && this.checkMobileNavigation,
          event: 'show-datepicker',
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
    isVideo () {
      return this.apodData.media_type === 'video'
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
      this.disabledDatePicker = true
      await this.getApod(this.selectedApodDate)
      this.disabledDatePicker = false
      this.onCloseModal()
    },
    onClickNext () {
      const date = moment(this.datePickerDate, 'YYYY-MM-DD')
      let nextDate = date.clone()
      nextDate = nextDate.add(2, 'd')
        .toISOString()
        .substr(0, 10)
      this.datePickerDate = nextDate
      this.onChangeDate()
    },
    onClickPrev () {
      const prevDate = moment(this.datePickerDate, 'YYYY-MM-DD')
        .subtract(12, 'hours')
        .toISOString()
        .substr(0, 10)
      this.datePickerDate = prevDate
      this.onChangeDate()
    },
    onClickShowDatepicker () {
      this.showMobileDatePicker = true
    },
    onClickToday () {
      this.datePickerDate = this.today
      this.onChangeDate()
    },
    onCloseModal () {
      this.showMobileDatePicker = false
    }
  }
}
</script>
