<template>
  <v-col cols="12">
    <v-row no-gutters>
      <v-col
        v-if="Object.keys(apodData).length"
        cols="12"
      >
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
    </v-row>

    <v-row>
      <buttons-row
        :items="buttons"
        @today="onClickToday"
        @prevDay="onClickPrev"
        @nextDay="onClickNext"
      />
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-date-picker
          v-model="datePickerDate"
          :disabled="disabled"
          :first-day-of-week="1"
          :max="today"
          :min="minDateAPOD"
          :reactive="true"
          :show-current="true"
          width="100%"
          @change="onChangeDate"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'

import buttonsRow from '@/components/core/buttonsRow'
import imageFullFrame from '@/components/core/ImageFullFrame'
import videoComponent from '@/components/core/videoPlayer'

export default {
  name: 'Home',
  components: {
    buttonsRow,
    imageFullFrame,
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
          text: 'Previous'
        },
        {
          condition: this.today !== this.datePickerDate,
          event: 'today',
          text: 'Today'
        },
        {
          condition: this.today !== this.datePickerDate,
          event: 'nextDay',
          text: 'Next'
        }
      ]
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
