<template>
  <v-row
    v-if="Object.keys(apodData).length"
    no-gutters
  >
    <v-col cols="12">
      <image-full-frame
        v-if="!isVideo"
        :description="apodData.explanation"
        :player-title="apodTitle"
        :src="apodSrc"
      />
      <video-component
        v-else
        :description="apodData.explanation"
        :player-title="apodTitle"
        :src="apodSrc"
      />
    </v-col>

    <!-- This v-col can be a new button-row component !!! -->
    <v-col
      class="pa-2"
      cols="12"
    >
      <v-col cols="8">
        <v-btn
          v-if="minDateAPOD !== datePickerDate"
          class="mx-2"
          @click="onClickPrev"
        >
          Previous
        </v-btn>
        <v-btn
          v-if="today !== datePickerDate"
          class="mx-2"
          @click="onClickToday"
        >
          Today
        </v-btn>
        <v-btn
          v-if="today !== datePickerDate"
          class="mx-2"
          @click="onClickNext"
        >
          Next
        </v-btn>
      </v-col>
    </v-col>

    <v-col cols="12">
      <v-date-picker
        v-model="datePickerDate"
        :disabled="disabled"
        :first-day-of-week="1"
        :max="today"
        :min="minDateAPOD"
        :reactive="true"
        :show-current="true"
        width="100vw"
        @change="onChangeDate"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import imageFullFrame from '@/components/core/ImageFullFrame'
import videoComponent from '@/components/core/videoPlayer'

export default {
  name: 'Home',
  components: {
    imageFullFrame,
    videoComponent
  },
  data() {
    return {
      apodTitle: "NASA Image of the Day",
      disabled: false,
      minDateAPOD: "2015-01-01"
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
    datePickerDate: {
      get () {
        return this.selectedApodDate || this.today
      },
      set (newDate) {
        this.setApodDate(newDate)
      }
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
