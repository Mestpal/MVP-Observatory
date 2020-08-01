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
    <v-col cols="12">
      <v-date-picker
        v-model="datePickerDate"
        :disabled="disabled"
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
      minDateAPOD: "2015-01-01",
      selectedDate: null
    }
  },
  computed: {
    ...mapGetters([
      'apodData'
    ]),
    apodSrc () {
      return  this.apodData.url || this.apodData.hdurl || ''
    },
    datePickerDate: {
      get () {
        return this.selectedDate || this.today
      },
      set (newDate) {
        this.selectedDate = newDate
      }
    },
    isVideo () {
      return this.apodData.media_type === 'video'
    },
    today () {
      return new Date().toISOString().substr(0, 10)
    }
  },
  mounted () {
    if(isEmpty(this.apodData)) this.getApod()
  },
  methods: {
    ...mapActions([
      'getApod'
    ]),
    async onChangeDate () {
      this.disabled = true
      await this.getApod(this.selectedDate)
      this.disabled = false
    }
  }
}
</script>
